import {PlaylistItem} from "../types/Playlist.ts";

/**
 * A list of identifiers used to separate partitions from one another.
 * Each Partition also keeps an array of all the items in it.
 * e.g. tracks with different composers are put into different partitions.
 * These partitions are identifiable by the traits that make them different from another.
 * The goal is for these partitions to represent a whole work/piece.
 */
interface PlaylistPartition {
    albumId: string;
    primaryArtistName: string;
    trackNumber: number;
    items: PlaylistItem[];
}

/**
 * Returns a shuffled copy of an array using the Fisher-Yates algorithm.
 */
export function shuffle<T>(array: T[], mutate: boolean = false): T[] {
    const shuffled: T[] = mutate ? array : [...array];

    for (let i = shuffled.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Partitions a track list by classical work/piece (if applicable), then shuffles
 * while keeping partitions intact and sorted.
 */
export function classicalShuffle(tracks: PlaylistItem[]) {
    const partitions: PlaylistPartition[] = classicalPartition(tracks);
    const shuffledPartitions: PlaylistPartition[] = shuffle(partitions, true);
    const shuffledTracks: PlaylistItem[] = [];

    for (const p of shuffledPartitions) {
        // Sort by track number in album
        p.items.sort((a, b) => a.item.track_number - b.item.track_number);

        // Combine all partition items into an array
        p.items.forEach(track => {
            shuffledTracks.push(track);
        });
    }

    return shuffledTracks;
}

/**
 * Partitions a track list by classical work/piece.
 */
export function classicalPartition(tracks: PlaylistItem[]): PlaylistPartition[] {
    const partitions: PlaylistPartition[] = [];

    for (const track of tracks) {
        const albumId: string = track.item.album.id;
        const primaryArtistName: string = track.item.artists[0].name;
        const trackNumber: number = track.item.track_number;
        let foundPartition: boolean = false;

        for (const p of partitions) {
            if (p.albumId === albumId && p.primaryArtistName === primaryArtistName) {
                p.items.push(track);
                foundPartition = true;
                break;
            }
        }

        if (!foundPartition) {
            partitions.push({
                albumId,
                primaryArtistName,
                trackNumber,
                items: [track],
            });
        }
    }

    return partitions;
}