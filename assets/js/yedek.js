// function renderThumbImage(newsWithComments) {
//     for (i=0;i < newsWithComments.length; i++ ) {
//         const currNews = newsWithComments[i]
//         const edittedTime = newsWithComments[i].created_at
//         const editTime = edittedTime.substring(0,19)
//         const replaceT = editTime.replace('T', ' -- ');
//         const img = newsWithComments[i].image_url
//         let commentsHtml = '';
//         if(currNews.comments) {
//         currNews.comments.forEach(comment => {
//             commentsHtml += `<p><strong>${comment.Username}:</strong> ${comment.Review}</p>`;
//         });
//         }
//         content.innerHTML +=`<div class="cards">
//             <div class="news">
//                 <h1>${currNews.short_title}</h1>
//                 <img src="${img}"></img>
//                     <p>Oluşturulma Zamanı: ${replaceT}</p>
//                     <p>Kategori: ${currNews.category}</p>
//                     <p>Lig: ${currNews.league}</p>
//                     <p>Takım: ${currNews.team} <img src="${currNews.team_icon}" style="width: 50px; height: 50px;"></p>
//                     <p>İçerik Giriş: ${currNews.content_entrance}</p>
//                     <p>İçerik Detayı: ${currNews.content_detail}</p>
//                     <div class="comments">
//                     <h3>Yorumlar:</h3>
//                     ${commentsHtml}
//                     </div>
//             </div>
//         </div>
//         `;
     
//     }
// }

//master