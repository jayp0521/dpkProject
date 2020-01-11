import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DpkFormService } from './dpk-form.service';

@Component({
    selector: 'app-dpk-form',
    templateUrl: './dpk-form.component.html',
    styleUrls: ['./dpk-form.component.css']
})
export class DpkFormComponent implements OnInit {
    @ViewChild('form') dpkFullForm: { resetForm: () => void; };

    constructor(private fb: FormBuilder, private dpkFormService: DpkFormService) {
    }

    DPKs = ['Dhun', 'Prathana', 'Kirtan'];

    dpkForm: FormGroup = this.fb.group({
        title: ['', Validators.required],
        lyrics: ['', Validators.required],
        definitions: [''],
        imagesURL: ['', Validators.required],
        dpk: ['', Validators.required]
    }, {validators: [this.dpkFormService.validSubmission]});

    ngOnInit() {
    }

    onSubmit() {
        this.dpkFormService.submitDPK(this.dpkForm);
        this.dpkFullForm.resetForm();
    }

    openDPKSlides() {
        this.dpkFormService.openDPKSlides(this.dpkForm);
    }

}
