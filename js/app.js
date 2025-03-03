const newsContainer = document.querySelector('.news-container')
const pagesElem = document.querySelectorAll('.pages')
const inputeElem = document.querySelector('input')
const searchResultsElem = document.querySelector('.search-results')
let TheNews = []
let allNews = []

updatePage()
getAllNews()


inputeElem.addEventListener('input', function () {
    if (this.value != '') {
        searchResultsElem.classList.add('show')
        searchFunc(this.value.toLowerCase())
    } else {
        searchResultsElem.classList.remove('show')
    }
})

pagesElem.forEach(item => {
    item.addEventListener('click', function () {

        pagesElem.forEach(item => {
            if (item.classList.value.includes('active')) {
                item.classList.remove('active')
            }
        })
        updatePage(this.dataset.page)
        this.classList.add('active')
    })
})



function searchFunc(data) {
    searchResultsElem.innerHTML = ''

    let results = allNews.filter(item => {
        return item.title.toLowerCase().includes(data)
    })

    if (results.length === 0) {
        searchResultsElem.innerHTML = 'nothing found :('
    } else {
        results.forEach(item => {
            searchResultsElem.insertAdjacentHTML("beforeend",
                `<div>
                <img src="${item.urlToImage}">
                <p>${item.title}</p>
                </div>`)
        })
    }
}


async function updatePage(data) {
    switch (data) {
        case 'TechCrunch':
            setNews(await getTechCrunchNews())
            break;
        case 'AppleCompany':
            setNews(await getAppleNews())
            break;
        case 'TeslaFactory':
            setNews(await getTeslaNews())
            break;
        case 'WallStreet':
            setNews(await getWallStreetNews())
            break;
        default:
            setNews(await getTechCrunchNews())
            break;
    }
}


// get data of API 
async function getAllNews() {
    let data = await getTechCrunchNews()
    allNews.push(...data)
    data = await getWallStreetNews()
    allNews.push(...data)
    data = await getAppleNews()
    allNews.push(...data)
    data = await getTeslaNews()
    allNews.push(...data)
}

async function getAppleNews() {
    const res = await fetch('https://newsapi.org/v2/everything?q=apple&from=2024-12-11&to=2024-12-11&sortBy=popularity&apiKey=95bcf59ccbf64bfebc1410fc6c70ca7b');
    const data = await res.json()
    return data.articles.splice(2, 7)
}

async function getWallStreetNews() {
    const res = await fetch('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=95bcf59ccbf64bfebc1410fc6c70ca7b');
    const data = await res.json();
    return data.articles.splice(0, 7);
}

async function getTeslaNews() {
    const res = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-11-15&sortBy=publishedAt&apiKey=95bcf59ccbf64bfebc1410fc6c70ca7b');
    const data = await res.json();
    return data.articles.splice(2, 7);
}

async function getTechCrunchNews() {
    const res = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=95bcf59ccbf64bfebc1410fc6c70ca7b');
    const data = await res.json();
    return data.articles.splice(1, 7);
}


// add data to DOM
 function setNews(newsData) {
    console.log(newsData)

    TheNews =  newsData;
    newsContainer.innerHTML = ''

    TheNews.forEach((item, index) => {

        let date = item.publishedAt.slice(0, item.publishedAt.indexOf("T"))
        let descrip = item.description.slice(0, 60)

        newsContainer.insertAdjacentHTML("beforeend",
            `       <section class="news-section news${index}" >
                        <div class="newsImg${index}">
                        </div>
                        <div>
                            <h4>${item.title}</h4>
                            <p>${descrip}...
                            </p>
                            <div>
                                <div>
                                    <p>${item.author}</p>
                                    <p>${date}</p>
                                </div>
                                <i>
                                    <svg width="15" height="21" viewBox="0 0 20 21" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.625 0C16.6406 0 17.5 0.859375 17.5 1.875V18.75C17.5 19.7266 16.4453 20.3125 15.5859 19.8438L10 16.5625L4.375 19.8438C3.51562 20.3125 2.5 19.7266 2.5 18.75V1.875C2.5 0.859375 3.32031 0 4.375 0H15.625ZM15.625 17.6562V2.10938C15.625 1.99219 15.5078 1.875 15.3516 1.875H4.57031C4.45312 1.875 4.375 1.99219 4.375 2.10938V17.6562L10 14.375L15.625 17.6562Z"
                                            fill="#3E3232" fill-opacity="0.5" />
                                    </svg>
    
                                </i>
                            </div>
                        </div>
                    </section>`)

        document.querySelector('.newsImg' + index).style.background = `center/cover no-repeat url(${item.urlToImage}) `

    })
}
