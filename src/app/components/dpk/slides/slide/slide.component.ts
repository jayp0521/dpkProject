import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { fadeAnimation } from 'src/app/animations/fade.animation'
import { SlideConfigI } from 'src/app/interfaces/slide-config-i'
import { SlideService } from 'src/app/services/slide.service'
import { AvControlService } from '../../../audio-component/av-control.service'
import { Bhajan } from 'src/app/interfaces/bhajan'
import * as screenfull from 'screenfull'

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: [ './slide.component.css' ],
    animations: [ fadeAnimation ],
})
export class SlideComponent implements OnInit, OnDestroy {
    firebaseBhajan$: Observable<Bhajan>

    stanza: string[][]
    audioTimings: number[]

    subscriptions: Subscription[] = []

    slideIndex: number
    hidden = true
    // @ts-ignore
    timeOuts = []

    slideConfig: SlideConfigI
    playBack: boolean

    constructor(
        private router: Router,
        private activeRouter: ActivatedRoute,
        public slideService: SlideService,
        private avControlService: AvControlService,
    ) {
    }

    ngOnInit() {
        this.activeRouter.params.subscribe(params => {
            this.slideIndex = params.id || 0
        })
        this.firebaseBhajan$ = this.slideService.bhajan$

        this.subscriptions.push(
            this.firebaseBhajan$.subscribe(bhajan => {
                this.stanza = bhajan.stanzaVisible
                this.audioTimings = bhajan.audioTimings
                if (this.audioTimings) this.audioTimings[0] = 0
            }),
        )

        this.subscriptions.push(
            this.slideService.slideConfig$.subscribe(slideConfig => {
                this.slideConfig = slideConfig
            }),
        )

        this.subscriptions.push(
            this.avControlService.paused$.subscribe(off => {
                this.playBack = !off
                if (off) {
                    this.timeOuts.forEach(times => clearTimeout(times))
                } else {
                    this.nextSlideAudio()
                }
            }),
        )
        this.hidden = false
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }

    nextSlideAudio() {
        this.timeOuts.forEach(times => clearTimeout(times))
        let index = this.slideIndex
        this.avControlService.avTime = this.audioTimings[index]
        const removeSecond = -this.audioTimings[index++]
        for (const seconds of this.audioTimings.slice(index)) {
            this.timeOuts.push(
                setTimeout(
                    () => this.upOrDown(true),
                    (removeSecond + seconds) * 1000,
                ),
            )
        }
    }

    async upOrDown(bool: boolean) {
        this.hidden = true
        await new Promise(done => setTimeout(() => done(), 500))
        bool ? ++this.slideIndex : --this.slideIndex
        this.slideIndex = this.slideService.edgeCheck(
            this.slideIndex,
            this.stanza.length,
        )
        this.hidden = false
        this.navigateID()
    }

    @HostListener('window:keyup', [ '$event' ])
    async slideMovement(event: KeyboardEvent) {
        if (
            (event.key === 'ArrowRight' ||
                event.key === ' ' ||
                event.key === 'PageDown') &&
            this.slideIndex < this.stanza.length - 1
        ) {
            this.upOrDown(true)
            if (this.playBack && this.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500))
                this.nextSlideAudio()
            }
        } else if (
            (event.key === 'ArrowLeft' || event.key === 'PageUp') &&
            this.slideIndex > 0
        ) {
            this.upOrDown(false)
            if (this.playBack && this.audioTimings) {
                await new Promise(done => setTimeout(() => done(), 500))
                this.nextSlideAudio()
            }
        } else if (event.key === 'b') {
            this.hidden = !this.hidden
        } else if (event.key === 'f') {
            if (screenfull.isEnabled) {
                await screenfull.toggle()
            }
        }
    }

    navigateID() {
        this.router
            .navigate([ `./`, { id: this.slideIndex } ], {
                relativeTo: this.activeRouter,
            })
            .then(
                _ => _,
                err => console.error(err),
            )
    }
}
