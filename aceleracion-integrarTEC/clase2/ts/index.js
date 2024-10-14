var Playlist = /** @class */ (function () {
    function Playlist() {
        this.songs = [];
    }
    Playlist.prototype.addSong = function (song) {
        // Implementar
        this.songs.push(song);
    };
    Playlist.prototype.removeSong = function (title) {
        // Implementar
        this.songs = this.songs.filter(function (song) { return song.title !== title; });
    };
    Playlist.prototype.getTotalDuration = function () {
        var totalSeconds = this.songs.reduce(function (acc, song) { return acc + song.duration; }, 0);
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;
        var format = function (time) { return (time < 10 ? "0".concat(time) : "".concat(time)); };
        return "".concat(format(hours), ":").concat(format(minutes), ":").concat(format(seconds));
    };
    Playlist.prototype.getSongsByArtist = function (artist) {
        // Implementar
        return this.songs.filter(function (song) { return song.artist === artist; });
    };
    return Playlist;
}());
// Ejemplo de uso:
var myPlaylist = new Playlist();
// Agregar canciones
myPlaylist.addSong({ title: "Song 1", artist: "Artist 1", duration: 210 });
myPlaylist.addSong({ title: "Song 2", artist: "Artist 2", duration: 180 });
myPlaylist.addSong({ title: "Song 3", artist: "Artist 1", duration: 240 });
// Mostrar duración total
console.log("Duración total:", myPlaylist.getTotalDuration()); // "00:10:30"
// Obtener canciones por artista
console.log("Canciones de Artist 1:", myPlaylist.getSongsByArtist("Artist 1"));
// Eliminar una canción
myPlaylist.removeSong("Song 2");
// Mostrar duración total después de eliminar una canción
console.log("Duración total tras eliminar:", myPlaylist.getTotalDuration());
