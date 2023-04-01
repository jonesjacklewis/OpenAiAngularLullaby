import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetLyricsService {

  constructor() { }

  async getLyrics(favouriteSongTitle: string, favouriteSongArtist: string) {

    try{
      const result = await fetch(`http://localhost:3000/lullaby/${encodeURIComponent(favouriteSongTitle)}/${encodeURIComponent(favouriteSongArtist)}`);
      const json = await result.json();
  
      if(!json.success){
        return [];
      }
  
      return json.text;
    }catch{
      return [];
    }
    


  }
}
