const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWdqdGJxYmF2enVvamlwYWpiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzM4MDg2MSwiZXhwIjoyMDA4OTU2ODYxfQ.Bdcg0fsHMVBQXSCypsvJTBRPxFl7u2eXwDt1-RXd_gg";
const apiUrl = "https://krqgjtbqbavzuojipajb.supabase.co";
const supaBase = supabase.createClient(apiUrl, apiKey);

let newsWithComments;
let viewCommentsButtons;

document.addEventListener('DOMContentLoaded', fetchTableRows);

async function fetchTableRows() {  
    try {
        const { data: fetchedNews, error: newsError } = await supaBase.from('News').select('*').order('news_id', { ascending: true });;
        const { data: fetchedComments, error: commentsError } = await supaBase.from('comments').select('*');
        
        if (newsError) {
            console.error('Haber verisi çekme hatası:', newsError);
            return;
        }

        if (commentsError) {
            console.error('Yorum verisi çekme hatası:', commentsError);
            return;
        }
        // onlyNews = fetchedNews;
        // onlyComments = fetchedComments;

        //Haber ve yorumları birleştirme
        newsWithComments = fetchedNews.map(newsItem => {
            const relatedComments = fetchedComments.filter(comment => comment.reviews_id === newsItem.news_id);
            return {
                ...newsItem,
                comments: relatedComments
            };
        });
        renderThumbImage(newsWithComments);
        renderHotTopics(newsWithComments)
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
}

const content = document.querySelector('.content');
const contentDetail = document.querySelector('.contentDetail')
const hotTopicContent = document.querySelector('.hotTopicContent')
const commentContainer = document.querySelector('.comment-container');


function renderHotTopics(newsWithComments) {
    for (let i = 0; i < 3; i++) {
        const currNews = newsWithComments[i];
        const img = newsWithComments[i].image_url;
        let commentsHtml = '';
        if (currNews.comments) {
            currNews.comments.forEach(comment => {
                commentsHtml += `<p><strong>${comment.Username}:</strong> ${comment.Review}</p>`;
            });
        }

        hotTopicContent.innerHTML += `<div class="banner-sub-content">
            <div class="hot-topic">
                <img src="${img}"></img>
                <div class="hot-topic-content" data-id="${currNews.news_id}">
                    <h3>${currNews.short_title}</h3>
                    <a data-id="${currNews.news_id}">Devamını Oku</a>
                </div>
            </div>
        </div>`;

        const cards = document.querySelectorAll('.hot-topic-content');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const newsId = card.getAttribute('data-id');
                const selectedNews = newsWithComments.find(news => news.news_id === newsId);
                if (selectedNews) {
                    // Seçilen haberi görüntüleme işlemini gerçekleştirin.
                    renderNewsDetail(selectedNews);
                }
            });
        });
    }
    setupCardCategoryListeners();
    setupTeamButtonListeners();
    setupViewCommentsButtonListeners();
}

function renderThumbImage(newsWithComments) {
    for (let i = 0; i < newsWithComments.length; i++) {
        const currNews = newsWithComments[i];
        const img = newsWithComments[i].image_url;
        let commentsHtml = '';
        if (currNews.comments) {
            currNews.comments.forEach(comment => {
                commentsHtml += `<p><strong>${comment.Username}:</strong> ${comment.Review}</p>`;
            });
        }

        content.innerHTML += `<div class="cards">
            <div class="news">
                <div class="teamInfo">
                    <p class="pWithImg" team="${currNews.team}">${currNews.team} <img src="${currNews.team_icon}" loading="lazy" style="width: 35px; height: 35px;"></p>
                </div>
                <div class="thumbNewsDetail" data-id="${currNews.news_id}">
                    <img src="${img}" loading="lazy"></img>
                    <h3>${currNews.short_title}</h3>
                </div>
            </div>
        </div>`;

        const cards = document.querySelectorAll('.thumbNewsDetail');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const newsId = card.getAttribute('data-id');
                const selectedNews = newsWithComments.find(news => news.news_id === newsId);
                if (selectedNews) {
                    // Seçilen haberi görüntüleme işlemini gerçekleştirin.
                    renderNewsDetail(selectedNews);
                }
            });
        });
    }
    setupCardCategoryListeners();
    setupTeamButtonListeners();
    setupViewCommentsButtonListeners();
}

async function renderNewsDetail(selectedNews) {
    content.innerHTML = '';
    contentDetail.innerHTML = '';
    hotTopicContent.innerHTML = '';
    categoryContent.innerHTML='';
    const edittedTime = selectedNews.created_at;
    const editTime = edittedTime.substring(0, 19);
    const replaceT = editTime.replace('T', ' -- ');
    const img = selectedNews.image_url;

    // fetchSimilarContent işlevine selectedNews'ı iletmek için burada çağırabilirsiniz.
    const similarContent = await fetchSimilarContent(selectedNews);

    contentDetail.innerHTML = `<div class="cardsDetail" data-id="${selectedNews.news_id}">
        <div class="newsDetail">
            <p>${replaceT}</p>
            <h1>${selectedNews.big_title}</h1>
            <div class="horizontalLine"></div>
            <p>${selectedNews.content_entrance}</p>
            <img src="${img}" loading="lazy"></img>
            <div class="teamCategory">
                <p><button class="teamButton" value="${selectedNews.category}">${selectedNews.category}</button></p>
                <p><button class="teamButton" value="${selectedNews.league}">${selectedNews.league}</button></p>
                <p class="pWithImg"><button class="teamButton" value="${selectedNews.team}">${selectedNews.team}<img src="${selectedNews.team_icon}" loading="lazy" style="width: 40px; height: 40px;"></button></p>
            </div>
            <p>${selectedNews.content_detail}</p>
        </div>
    </div>`;
    if (similarContent.length > 0) {
        contentDetail.innerHTML += `
            <div class="similarContent">
                <h4>Göz atabileceğiniz benzer diğer haberler</h4>
                <div class="similarInContent">
                    ${similarContent.map(similarNews => `
                        <div data-id="${similarNews.news_id}" class="similarNewsItem">
                            <img src="${similarNews.image_url}">
                            <p>${similarNews.short_title}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
        }
    contentDetail.innerHTML +=`
    <button class="view-comments-button" data-id="${selectedNews.news_id}">Yorumları Görüntüle</button>
    `;
    setupTeamButtonListeners();
    setupSimilarNewsListeners();
    setupViewCommentsButtonListeners();
}
async function renderComments(newsId) {
    commentContainer.innerHTML = '';

    const selectedNews = newsWithComments.find(news => news.news_id === newsId);

    if (!selectedNews) {
        console.error('Seçilen haber bulunamadı.');
        return;
    }

    let commentsHtml = '';

    if (selectedNews.comments) {
        selectedNews.comments.forEach(comment => {
            commentsHtml += `<div class="commenter">
                <p class="commenterName">${comment.Username}:</p> 
                <p class="commenterReview">${comment.Review}</p>
            </div>
            <div class="horizontalLine"></div>`;
        });
    }

    // Include a unique form identifier (data-id) for each comment form
    commentContainer.innerHTML += `
        <div class="comments">
            <h3>Yorum Ekle:</h3>
            <form class="comment-form" data-id="${selectedNews.news_id}">
                <input type="text" id="Username" name="Username" placeholder="İsminiz"></input>
                <textarea id="Review" name="review" placeholder="Yorumunuz" rows="6"></textarea>
                <button type="submit" id="submit-button">Yorum Ekle</button>
            </form>
            <div class="showComments">
                <h3>Yorumlar:</h3>
                ${commentsHtml}
            </div>
        </div>`;

    // ...


    setupTeamButtonListeners();
    setupSimilarNewsListeners();
    setupViewCommentsButtonListeners();
}

// Use event delegation to capture form submissions
commentContainer.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const form = event.target;

    // Check if the submitted form is a comment form
    if (form.classList.contains('comment-form')) {
        const Username = form.querySelector('#Username').value;
        const Review = form.querySelector('#Review').value;
        const selectedNewsId = form.getAttribute('data-id');

        // Handle the comment submission for the specific news item
        handleComment(Username, Review, selectedNewsId);
    }
});

// Function to handle comment submission
async function handleComment(Username, Review, selectedNewsId) {
    try {
        const { data, error, status } = await supaBase
            .from('comments')
            .insert([
                {
                    Username,
                    Review,
                    reviews_id: selectedNewsId,
                },
            ]);

        if (status === 201) {
            alert('Yorum Başarıyla Gönderildi');
            // Reload comments or update the UI as needed
            const selectedNews = newsWithComments.find(news => news.news_id === selectedNewsId);
            if (selectedNews) {
                if (!selectedNews.comments) {
                    selectedNews.comments = [];
                }
                selectedNews.comments.push({
                    Username,
                    Review,
                });
            }

            // Render the comments immediately
            renderComments(selectedNewsId);
        } else {
            console.error('Yorum eklenirken bir hata oluştu:', error);
            // Handle the case where the request was not successful
            // You can log the specific error message or display it to the user.
        }

        // Clear the form
        const form = commentContainer.querySelector(`[data-id="${selectedNewsId}"]`);
        if (form) {
            form.reset();
        }
    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
}


function setupTeamButtonListeners() {
    const teamButtons = document.querySelectorAll('.teamButton');
    teamButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.value;
            renderTeams(category);
        });
    });
}
function setupCardCategoryListeners() {
    const cardCategories = document.querySelectorAll('.pWithImg');

    cardCategories.forEach(category => {
        category.addEventListener('click', () => {
            const categoryName = category.getAttribute('team');
            renderTeams(categoryName);
        });
    });
}



async function fetchSimilarContent(selectedNews) {
    try {
        // Takım adına göre benzer içerikleri çekme işlemi
        const { data, error } = await supaBase
            .from('News')
            .select('*')
            .eq('team', selectedNews.team)
            .neq('news_id', selectedNews.news_id)
            .limit(5)
            .order('id', { ascending: true }); // Benzer içerikleri sıralamak için ekledik

        if (error) {
            console.error('Benzer içerikleri çekerken hata oluştu:', error);
            return [];
        }

        return data;
    } catch (error) {
        console.error('Bir hata oluştu:', error);
        return [];
    }
}

function setupSimilarNewsListeners() {
    const similarNewsItems = document.querySelectorAll('.similarNewsItem');
    similarNewsItems.forEach(item => {
        item.addEventListener('click', () => {
            const newsId = item.getAttribute('data-id');
            const selectedSimilarNews = newsWithComments.find(news => news.news_id === newsId);
            if (selectedSimilarNews) {
                renderNewsDetail(selectedSimilarNews);
            }
        });
    });
}


function setupViewCommentsButtonListeners() {
    const viewCommentsButtons = document.querySelectorAll('.view-comments-button');
    viewCommentsButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const newsId = button.getAttribute('data-id');
            const selectedNews = newsWithComments.find(news => news.news_id === newsId);

            if (selectedNews) {
                // Load and render comments for the selected news item
                await renderComments(selectedNews.news_id);
            }
        });
    });
}



// Call the function to set up the "View Comments" button listeners
setupViewCommentsButtonListeners();

// Rest of your code...




document.querySelector("#contact-link").addEventListener("click", function () {

    let emailAddress = "orhanekici@gmail.com";
    let subject = "İletişim Talebi";

    let mailtoLink = "mailto:" + emailAddress + "?subject=" + subject;

    window.location.href = mailtoLink;
});


