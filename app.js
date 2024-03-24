let count=0;
// All post
const loadAllPost = async (query)=>{
    document.getElementById('loading-spinner').classList.remove('hidden')
    document.getElementById('card-container').classList.add('hidden')

    const url=`https://openapi.programming-hero.com/api/retro-forum/posts${query}`
    const response=await fetch(url);
    const data=await response.json();
    console.log(data.posts);
    if(data.posts.length>0){
        setTimeout( ()=>{
            document.getElementById('loading-spinner').classList.add('hidden')
            document.getElementById('card-container').classList.remove('hidden')    
        },2000)
    }
    
    const contentContainer=document.getElementById('content-container');
    contentContainer.textContent='';
    setTimeout(()=>{
        data.posts.forEach((content)=>{
            const div=document.createElement("div")
            div.innerHTML=`
                <div id="content-container" class="rounded-2xl bg-[#797dfc10] p-4 border-2 lg:flex gap-5">
                    <div class="avatar">
                      <div class="w-24 lg:h-[50%] rounded relative">
                        <img src="${content.image}" />
                        <div class="badge ${content?.isActive?'badge-primary':'badge-error'} badge-sm absolute right-0 top-0">
                        </div>
                      </div>
                    </div>            
                    <div class="space-y-3 lg:w-[90%]">
                        <div class="flex gap-5">
                            <p># ${content.category}</p>
                            <p>Author : ${content.author.name}</p>
                        </div>
                        <h2 class="font-semibold"> ${content.title}</h2>
                        <p> ${content.description}</p>
                        <hr class="border-1 border-dashed border-slate-950">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2">
                                    <img src="images/tabler-icon-message-2.png" alt="">
                                    <p>${content.comment_count}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="images/Group 16.svg" alt="">
                                    <p>${content.view_count}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    <img src="images/tabler-icon-clock-hour-9 (1).svg" alt="">
                                    <p>${content.posted_time} min</p>
                                </div>
                            </div>
                            <div>
                                <button onclick="cardContent('${content.title}',${content.view_count})">
                                    <img src="images/email 1.svg" alt=""></img>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            contentContainer.appendChild(div)
        })
    },2000)
}
loadAllPost("");

// Card Content
const cardContent = (title,view) => {
     console.log(count)
     const cardContainer=document.getElementById("card-container")
     const div=document.createElement("div");
    //console.log(title,view)
     div.innerHTML=`
        <div class="bg-white p-3 flex justify-between items-center rounded-2xl">
            <p class="w-[60%] font-semibold">${title}</p>
            <div class="flex flex-row items-center">
                <img src="images/Group 16.svg" alt="">
                <p>${view}</p>
            </div>
        </div>
     `
     cardContainer.appendChild(div)

     count++;
     const countNumber=document.getElementById('count-number').innerText=count
     
}

// Handle search
handleSearch = () =>{
    const value=document.getElementById('search-input').value;
    loadAllPost(`?category=${value}`)
}

// Latest card section
const latestCardContainer= async(card) => {
    const url=' https://openapi.programming-hero.com/api/retro-forum/latest-posts';
    const response=await fetch(url);
    const data=await response.json();
    //console.log(data);
    const cardId=document.getElementById('latest-post')

    data.forEach((content)=>{
        const div=document.createElement('div')
        div.innerHTML=`
        <div class="border-2 rounded-2xl p-4">      
            <div class="space-y-3">
                <img src="${content.cover_image}" alt="">
                <div class="flex gap-2">
                    <img src="images/Frame.svg" alt="">
                    <p>${content?.author?.posted_date || 'No publish date'}</p>
                </div>
                <h4 class="font-semibold">${content.title}</h4>
                <p class="text-xm">${content.description}</p>
                <div class="flex gap-3 items-center">
                    <div class="avatar">
                      <div class="w-12 rounded-full">
                        <img src="${content.profile_image}" />
                      </div>
                    </div>
                    <div>
                        <p class="font-semibold">${content.author.name}</p>
                        <p>${content?.author?.designation || 'Unknown'}</p>
                    </div>
                </div>
             </div>
        </div>
        `
        cardId.appendChild(div)
    })
}
latestCardContainer("")