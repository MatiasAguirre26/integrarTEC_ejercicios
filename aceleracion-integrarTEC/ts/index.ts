interface Song {
    title: string;
    artist: string;
    duration: number;
  }
  
class Playlist {
    private songs: Song[] = [];

    // Agregar una nueva canción a la playlist.
    addSong(song: Song): void {
        
        this.songs.push(song);
    }

    // Eliminar una canción de la playlist por su título.
    removeSong(title: string): void {
        
        this.songs = this.songs.filter(song => song.title !== title);
    }

    // Mostrar la duración total de la playlist.
    getTotalDuration(): string {
        const totalSeconds = this.songs.reduce((acc, song) => acc + song.duration, 0);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const format = (time: number) => (time < 10 ? `0${time}` : `${time}`);
        
        return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }

    //Obtener canciones de un artista
    getSongsByArtist(artist: string): Song[] {
        
        return this.songs.filter(song => song.artist === artist);
    }
}