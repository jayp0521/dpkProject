import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { SliderService } from './slider.service'

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, OnDestroy {
    dpkFolder: Observable<Map<string, string[]>>
    dpkFolderList: string[]

    gitHubFiles: Map<string, string>

    constructor(private sliderService: SliderService) {}

    ngOnInit(): void {
        this.dpkFolder = this.sliderService.dpkFolder$
        this.dpkFolderList = ['Dhun', 'Prarthana', 'Kirtan', 'Miscellaneous']

        this.gitHubFiles = this.sliderService.gitHubImages
    }

    ngOnDestroy(): void {}

    getGitHubURL(category: string, title: string) {
        return this.sliderService.detectBrowser
            ? this.gitHubFiles.get(`${title}.webp`)
            : this.gitHubFiles.get(`${title}.jpeg`)
    }

    imageToURLL(url: string) {
        if (url) return `url(${url})`
        else return ''
    }
}
