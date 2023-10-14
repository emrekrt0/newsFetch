const teamButtons = document.querySelectorAll('.teamButton');
const indexButton = document.querySelector('.indexButton');
const categoryContent = document.querySelector('.categoryContent')

// //Anasayfa'yı getir
// indexButton.addEventListener('click', async function() {
//     await fetchTableRows();
//     content.innerHTML='';
//     contentDetail.innerHTML='';
//     renderThumbImage(newsWithComments);
// });


//Kategorileri getir
teamButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.value;
        renderTeams(category);
    });
});



//Takım-lig haberlerini getir
async function renderTeams(category) {
    // category = category.toLowerCase();
    content.innerHTML='';
    categoryContent.innerHTML='';
    contentDetail.innerHTML='';
    hotTopicContent.innerHTML='';
    for (i=0; i<newsWithComments.length ;i++) {
        if(newsWithComments[i].team === category || newsWithComments[i].league === category || newsWithComments[i].category === category ) {
            const currTeamPost = newsWithComments[i]
            const currLeaugeImg = newsWithComments[i].league_icon
            const currCategory = category
            if (currCategory != newsWithComments[i].team) {
            categoryContent.innerHTML+=`
            <div class="cards">
                <div class="news">
                    <div class="categoryInfo">
                    <h5>${currCategory}</h5> <img src="${currLeaugeImg}" loading="lazy"" style="width: 82px; height: 78px;">
                    </div>
                    <div class="teamInfo">
                        <p class="pWithImg" team="${currTeamPost.team}">${currTeamPost.team} <img src="${currTeamPost.team_icon}" style="width: 35px; height: 35px;"></p>
                    </div>
                    <div class="thumbNewsDetail" data-id="${currTeamPost.news_id}">
                        <img src="${currTeamPost.image_url}" loading="lazy"></img>
                        <h3>${currTeamPost.short_title}</h3>
                    </div>
                </div>
            </div>
            `;
        } else {           
            categoryContent.innerHTML+=`
            <div class="cards">
                <div class="news">
                    <div class="teamInfo">
                        <h5></h5>
                        <p class="pWithImg" team="${currTeamPost.team}">${currTeamPost.team} <img src="${currTeamPost.team_icon}" style="width: 35px; height: 35px;"></p>
                    </div>
                    <div class="thumbNewsDetail" data-id="${currTeamPost.news_id}">
                        <img src="${currTeamPost.image_url}" loading="lazy"></img>
                        <h3>${currTeamPost.short_title}</h3>
                    </div>
                </div>
            </div>
            `;
        }
            const cards = document.querySelectorAll('.thumbNewsDetail');
            cards.forEach(card => {
            card.addEventListener('click', () => {
                const newsId = card.getAttribute('data-id');
                const selectedNews = newsWithComments.find(news => news.news_id === newsId);
                if (selectedNews) {
                    // Seçilen haberi görüntüleme işlemini gerçekleştirin.
                    renderNewsDetail(selectedNews);
                    window.location.hash = `#/${selectedNews.category}/${selectedNews.league}/${selectedNews.team}/${selectedNews.news_id}`;
                }
            });
        });
        } 
    }
    
    setupCardCategoryListeners();
    setupTeamButtonListeners();
    setupViewCommentsButtonListeners();
}