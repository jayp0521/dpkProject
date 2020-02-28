import { Injectable } from '@angular/core';
import { Slider } from '../../../../interfaces/slider';
import { DriveAPIService } from '../../../../services/drive-api.service';
import { DriveMaterialList } from '../../../../interfaces/drive';
import { take } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SliderService {

    private _dpkFolder: ReplaySubject<Map<string, Slider[]>>;
    dpkFolder$: Observable<Map<string, Slider[]>>;


    constructor(private driveAPIService: DriveAPIService) {
        this._dpkFolder = new ReplaySubject<Map<string, Slider[]>>();
        this.dpkFolder$ = this._dpkFolder.asObservable();

        const dpks = new Map<string, string>().set('Dhun', '1EI8HFzxxO94jyXMIC4mmSKEWF9dKTDcB')
            .set('Prathana', '1ncfYSnh6WRercX8KtgCsDrk6fsnVzBEw').set('Kirtan', '1aczJKsMPPblN7yNdFuoiYXfJXH7Tc_yU');
        this.dpkFolder(dpks);
    }

    dpkFolder(dpks: Map<string, string>) {
        const dpkFolderList = new Map<string, Slider[]>();
        for (const [ type, id ] of dpks) {
            const dpkObservable = this.driveAPIService.getListOfFolders(id);
            dpkObservable.pipe(take(1)).subscribe(
                DPKs => {
                    const dpk = this.dpkMaterial(DPKs);
                    dpkFolderList.set(type, dpk);
                }
            );
        }
        this._dpkFolder.next(dpkFolderList);
    }

    private dpkMaterial(DPKs: DriveMaterialList): Slider[] {
        const dpk: Slider[] = [];
        for (const DPK of DPKs.files) {
            const name = DPK.name;
            this.driveAPIService.getListOfFiles(`'${ DPK.id }' in parents`).pipe(take(1)).subscribe(images => {
                const imageID = images.files[0].id;
                const imageURL = this.driveAPIService.exportThumbnailDriveURL(imageID);
                dpk.push({
                    name,
                    imageID,
                    image: this.driveAPIService.preloadImage(imageURL),
                });
            });
        }
        return dpk;
    }
}
