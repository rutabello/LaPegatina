import axios from 'axios';
// import KEY from './KeyYT'

const getPlayListItems = async () => {

    const result = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
            part: 'id,snippet',
            maxResults: 20,
            playlistId: 'OLAK5uy_ld3vZ36EzClyLc6C4ZSFtdDN6PLDqQEUk',
            // key: KEY
        },
    });

    return result.data;
};

// getPlayListItems("PlaylistID")

// .then(data => {
//   let arrVideoId=[]
//   data.items.map(element => {
//     let oneVideoID = element.snippet.resourceId.videoId
//     console.log (oneVideoID)
//     arrVideoId.push(oneVideoID)
//   })
//   console.log(arrVideoId)


// })

export default getPlayListItems;
