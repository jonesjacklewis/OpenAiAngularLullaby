import { Component } from '@angular/core';
import { GetLyricsService } from 'src/app/services/get-lyrics/get-lyrics.service';
import { Lyrics } from 'src/app/models/lyrics/lyrics.interface';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  songTitle: string = "";
  songArtist: string = "";
  customLullabyLyrics: any = "";
  verseRegex: RegExp = /Verse \d{1,}/g
  chorusRegex: RegExp = /Chorus/g
  buttonDisabled: boolean = false;
  
  lyricsToOutput: Lyrics[] = [];

  constructor(private getLyricsService: GetLyricsService,
    private matSnackBar: MatSnackBar){}

  async customLullaby(){
    this.buttonDisabled = true;
    this.lyricsToOutput = [];

    this.songTitle = this.songTitle.trim();
    this.songArtist = this.songArtist.trim();

    this.customLullabyLyrics = await this.getLyricsService.getLyrics(this.songTitle, this.songArtist);

    if(this.customLullabyLyrics.length == 0){
      this.buttonDisabled = false;
      this.matSnackBar.open("Something Went Wrong, Please Try Again. If this continues please contact the developer.");
      return;
    }

    this.customLullabyLyrics = this.customLullabyLyrics.trim();

    const splitLyrics: string[] = this.customLullabyLyrics.split("\n");

    for(let i = 0; i < splitLyrics.length; i++){
      let line = splitLyrics[i];

      let lyric: Lyrics = {
        isHeading: false,
        lyric: line
      };

      if(this.verseRegex.test(line) || this.chorusRegex.test(line)){
        lyric.isHeading = true;
      }

      this.lyricsToOutput.push(lyric);


    }

    this.buttonDisabled = false;

  }


}