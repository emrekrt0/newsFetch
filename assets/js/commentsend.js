// document.addEventListener('DOMContentLoaded', () => {
//     const commentForm = document.querySelector('#commentFormIframe');
//     commentForm.addEventListener('submit', handleCommentIframe);
// });

// async function handleCommentIframe(e) {
//     e.preventDefault();
//     const iframe = await document.querySelector('.iframeClass').getAttribute('data-id');
// //   const selectedNewsId = iframe.getAttribute('data-id');
//   const Username = document.querySelector("#Username").value;
//   const Review = document.querySelector("#Review").value;

//   try {
//     const { data, error } = await supaBase
//       .from('comments')
//       .insert([
//         {
//           news_id: iframe,
//           Username,
//           Review
//         }
//       ]);

//     if (error) {
//       console.error('Yorum ekleme hatası:', error);
//     } else {
//       console.log('Yorum başarıyla eklendi:', data);
//       alert('Yorum Başarıyla Gönderildi');
//     }
//   } catch (error) {
//     console.error('Bir hata oluştu:', error);
//   }
// };