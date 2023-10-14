const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWdqdGJxYmF2enVvamlwYWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzM4MDg2MSwiZXhwIjoyMDA4OTU2ODYxfQ.Bdcg0fsHMVBQXSCypsvJTBRPxFl7u2eXwDt1-RXd_gg";
const apiUrl = "https://krqgjtbqbavzuojipajb.supabase.co";
const supaBase = supabase.createClient(apiUrl, apiKey);

document.addEventListener('DOMContentLoaded', () => {
    const newsForm = document.querySelector('#newsForm');
    newsForm.addEventListener('submit', handleSubmit);
});


async function handleSubmit(event) {
    event.preventDefault();

    const imageInput = document.querySelector('#imageInput');
    const short_title = document.querySelector('#short_title').value;
    const big_title = document.querySelector('#big_title').value;
    const category = document.querySelector('#category').value;
    const league = document.querySelector('#league').value;
    const content_entrance = document.querySelector('#content_entrance').value;
    const team = document.querySelector('#team').value;
    const content_detail = document.querySelector('#content_detail').value;
    const team_icon = document.querySelector('#team_icon').value;

    const imageFile = imageInput.files[0]; // Seçilen dosya

    try {
        // Görseli Supabase'e yükleme
        const { data: imageUploadData, error: imageUploadError } = await supaBase.storage
            .from('newsImages')
            .upload(`${imageFile.name}`, imageFile);
    
        if (imageUploadError) {
            console.error('Görsel yükleme hatası:', imageUploadError);
            return;
        }
    
        // Görselin yüklendiği URL'nin tamamını alın
        const fullImageUrl = imageUploadData.Key;

        // Görselin yüklendiği URL'den newsImages/ kısmını çıkararak image_url'yi oluşturun
        const image_url = 'https://krqgjtbqbavzuojipajb.supabase.co/storage/v1/object/public/'+fullImageUrl;
    
        // Supabase'e veriyi ekleme
        const { data, error } = await supaBase
            .from('News')
            .insert([
                {
                    short_title,
                    big_title,
                    category,
                    league,
                    image_url,
                    content_entrance,
                    team,
                    content_detail,
                    team_icon
                }
            ]);
    
        if (error) {
            console.error('Veri ekleme hatası:', error);
        } else {
            console.log('Veri başarıyla eklendi:', data);
            alert('Veri Başarıyla Gönderildi');
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
};  



// Event listener for the comment submission form
// Event listener for the comment submission form
// document.addEventListener('DOMContentLoaded', function() {
//     const commentForm = document.querySelector('#comment-form');
//     commentForm.addEventListener('submit', handleComment);
//   });
  
//   async function handleComment(event) {
//     event.preventDefault(); // Prevent the default form submission behavior
  
//     const Username = document.querySelector('#Username').value;
//     const Review = document.querySelector('#Review').value;
  
//     // Get the selected news ID dynamically from your code
//     const selectedNewsId = document.querySelector('.cardsDetail').getAttribute('data-id');
  
//     try {
//       // Send a POST request to your Supabase backend to insert a new comment
//       const { data, error } = await supaBase
//         .from('comments')
//         .insert([
//           {
//             Username,
//             Review,
//             news_id: selectedNewsId, // Use the actual field name for news ID
//           },
//         ]);
//         if (data) (
//             alert('Yorum Başarıyla Gönderildi')
//         )
//        else if (error) {
//         // Handle the case where the request was not successful
//         throw new Error('Yorum eklenirken bir hata oluştu.');
//        }
  
//       // Clear the form
//       document.querySelector('#comment-form').reset();
  
//       // Optionally, you can display a success message to the user
//       alert('Yorum Başarıyla Gönderildi');
  
//       // Reload comments or update the UI as needed
//       renderComments(); // You should define this function to update the comments
  
//     } catch (error) {
//       console.error('Bir hata oluştu:', error);
//     }
//   }




// const form = document.querySelector('#comment-form');
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const data = new FormData(form);
//     const formObject = Object.fromEntries(data);
 
//     fetch('https://krqgjtbqbavzuojipajb.supabase.co', {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWdqdGJxYmF2enVvamlwYWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzM4MDg2MSwiZXhwIjoyMDA4OTU2ODYxfQ.Bdcg0fsHMVBQXSCypsvJTBRPxFl7u2eXwDt1-RXd_gg'
//        },
//        body: JSON.stringify({ data: formObject })
//     })
//     .then(function(r) {
//        return r.json();
//     })
//     .then(function(responseData) {
//        console.log('Yorum başarıyla eklendi:', responseData);
//     })
//     .catch(function(error) {
//        console.error('Hata oluştu:', error);
//     });
//  });
 
// const commentForm = document.querySelector('#comment-form');

// commentForm.addEventListener('submit', async (event) => {
//    event.preventDefault();
 
//    const username = document.querySelector('#name').value;
//    const comment = document.querySelector('#comment').value;
 
//    // yorum ekleme
//    const { data, error } = await supabase
//      .from('comments')
//      .upsert([{ username, comment }], { onConflict: ['username'] });
 
//    if (error) {
//      console.error('Yorum eklenirken bir hata oluştu:', error.message);
//    } else {
//      console.log('Yorum başarıyla eklendi:', data);
    
//    }
//  });