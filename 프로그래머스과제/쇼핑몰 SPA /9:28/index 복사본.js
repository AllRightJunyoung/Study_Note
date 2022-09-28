// 문제푸는데 시행착오 계속해서 2틀가까이 걸림ㅋㅋㅋㅋㅋㅋㅋㅋㅋ 9/28 계속연습해야할듯



const productDetailPage = document.querySelector('.ProductDetailPage')
const app=document.querySelector('.App')
let productItems=[]

const CartOrderClickHandler=()=>{
    alert("주문이 완료되었습니다.")
    router("/web/")
    RenderMainPage()
    localStorage.clear()
    return
}
const onPopstateHandler=async ()=>{
    let url=location.pathname
    url=url.split('/')

    if(location.pathname==="/web/"){
        RenderMainPage()
    }

    else {
        const id=+url[url.length-1]
        let main_data=await fetchData("https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products")
        main_data=main_data.filter((elem)=>elem.id==id)[0]
        const sub_data=(await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${main_data.id}`)).productOptions
        RenderProductDetail(main_data,sub_data)
        router(`/web/products/${id}`)
    }
    return
}

window.addEventListener('popstate',onPopstateHandler)
const router=(route)=>{
    if (route === location.pathname) {
		history.replaceState(null, '', route);
	}
	else {
		history.pushState(null, '', route);
	}
}

const renderTemplate=(_root,template)=>{
    _root.innerHTML=template
    
}
const CartOrderHandeler=()=>{
      RenderOrderPage()
      router("/web/cart")
    
}


const setLocalStoageItem=(localItems,user_cart)=>{
    let new_localItems=[...localItems]
    let flag=false
    // 기존에 로컬스토리지 아이템을 검색해서 동일한게 이미 존재하면 수량만바꿈
    new_localItems.forEach((elem)=>{
        if(user_cart.optionId === elem.optionId && user_cart.productId === elem.productId){
            elem.quantity=user_cart.quantity
            flag=true
       }
    })  
    // 없으면 추가
    if(!flag){
        new_localItems.push(user_cart)
    }  
    return new_localItems


}

const saveLocalStorage=(user_cart)=>{

    if(localStorage.getItem('products_cart')===null){
        localStorage.setItem('products_cart',JSON.stringify([]))
    }

    let localItems=JSON.parse(localStorage.getItem('products_cart'))
    localItems=setLocalStoageItem(localItems,user_cart)
    localStorage.setItem('products_cart',JSON.stringify(localItems) )
    return
}

const ProductClickHandler=async (e)=>{
    const parent=e.target.parentNode;
    let product_name;
    if(parent.className==="Product"){
        product_name=parent.children[1].children[0].childNodes[0].nodeValue   
     }
    else{
        product_name=parent.children[0].childNodes[0].nodeValue
    }
    const product=await fetchData("https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products")

    const product_data=product.filter((elem)=>elem.name===product_name)[0]
    const product_options_data=await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${product_data.id}`)
    RenderProductDetail(product_data,product_options_data.productOptions)
    router(`/web/products/${product_data.id}`)

 }


const isSelectedName=(name)=>{
  
  const ul=document.querySelector('.ProductDetail__selectedOptions ul')
  const selected_product_list=[...ul.children]
  let flag=false
  selected_product_list.forEach((elem)=>{
      let item_name=name+"원개"
      let target_name=elem.textContent
      if(item_name==elem.textContent){
        flag=true
    }
   })
   if(flag){
       return false
   }
   return true

}

const onSelectedItemHandler=async(e)=>{
    const product_name=e.target.parentNode.parentNode.children[1].children[0].textContent
    const options=e.target.options
    const user_product_selected=options[e.target.options.selectedIndex]

    let product_data=await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products`)
    let user_product=product_data.filter((elem)=>elem.name===product_name)[0]
    let user_product_option=await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${user_product.id}`)
    RenderProductSelected(user_product,user_product_option.productOptions,user_product_selected.dataset.id)

}



const RenderCartTotal=(cart_total)=>{
    const totalPricePage=document.querySelector('.ProductDetail__totalPrice')
    renderTemplate(totalPricePage,`${cart_total}원`)
}

const fetchSelectedData=async (name)=>{
    const product=await fetchData("https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products")
    const product_data=product.filter((elem)=>elem.name===name)[0]
    return product_data

}
const fetchSelectedOptionData=async(product_id)=>{
    const product_options_data=await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${product_id}`)
    return product_options_data
}

// input 변화시 실행
const onInputChangeHandler=async (event)=>{
    
    const ul=document.querySelector('.ProductDetail__selectedOptions ul')
    const selected_product_list=[...ul.children]
    let total=0
    for(const elem of selected_product_list){
        let input=elem.children[0].children[0]
        let product_selected_number=input.value
        let product_seleted_name=input.dataset.name;
        let product_id=+input.dataset.id
        const product_main_data=await fetchSelectedData(product_seleted_name)
        const product_option_data=(await fetchSelectedOptionData(product_main_data.id)).productOptions.filter((data)=>data.id==product_id)[0]
        const product_price=product_main_data.price+product_option_data.price
        total+=product_price*product_selected_number
    
        let obj={ "productId":`${product_main_data.id}`,
        "optionId":`${product_option_data.id}`,
        "quantity":`${product_selected_number}`
        }
        saveLocalStorage(obj)
        RenderCartTotal(total)
        document.querySelector('.ProductDetail__selectedOptions .OrderButton').addEventListener('click',CartOrderHandeler)
    }

}
const RenderProductSelected=(main_data,sub_data,product_id)=>{

const user_product=sub_data.filter((e)=>e.id==product_id)[0]
const product_name=`${user_product.name} ${main_data.price+user_product.price}`

if(!isSelectedName(product_name)){
    return 
}

let li=document.createElement('li')
let div=document.createElement('div')
let input=document.createElement('input')
let text=document.createElement('text')
text.textContent="개"
li.textContent=`${product_name}원`
  input.setAttribute('type',"number")
  input.setAttribute('max',`${user_product.stock}`)
  input.setAttribute('min',`0`)
  input.setAttribute('value','0')
  input.setAttribute('data-name',`${main_data.name}`)
  input.setAttribute('data-id',`${product_id}`)
  
  input.addEventListener('change',onInputChangeHandler)
  li.appendChild(div)
  div.appendChild(input)
  div.appendChild(text)
  document.querySelector('.ProductDetail__selectedOptions ul').append(li)
  return
}

const RenderProductDetail=(main_data,sub_data)=>{
    let product_main_img=main_data.imageUrl
    let product_main_name=main_data.name
    let product_price=main_data.price
    let productOptionsData=[...sub_data]
    let optionItemsTemplate=""

    productOptionsData.forEach((product)=>{
        let tag;
        if(product.price===0){
            tag=`<option data-id="${product.id}">${product_main_name} ${product.name}</option>`
        }
        else if(product.price>0){
            tag=`<option data-id="${product.id}">${product_main_name} ${product.name} (+${product.price}원)</option>`            
        }
        
        if(product.stock===0){
            tag=`<option disabled data-id="${product.id}">(품절) ${product_main_name} ${product.name}</option>`  
        }
     
        optionItemsTemplate+=tag
    })

    let template= `
    <div class="ProductDetailPage">
    <h1>${product_main_name} 상품 정보</h1>
    <div class="ProductDetail">
      <img src="${product_main_img}">
      <div class="ProductDetail__info">
        <h2>${product_main_name}</h2>
        <div class="ProductDetail__price">${product_price}원~</div>
        <select>
          <option>선택하세요.</option>
          ${optionItemsTemplate}
        </select>
        <div class="ProductDetail__selectedOptions">
        <h3>선택된 상품</h3>
        <ul>

        </ul>
        <div class="ProductDetail__totalPrice"></div>
        <button class="OrderButton">주문하기</button>
      </div>
      </div>
    `
    renderTemplate(app,template)
    document.querySelector('.ProductDetail__info select').addEventListener('change',onSelectedItemHandler)
}




const fetchData=async(url)=>{
    const response=await fetch(url,{
        method:'GET',
    })
    const data=await response.json()
    return data
}

const RenderMainPage= async()=>{ 
    let main_items=await fetchData('https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products')
    let text="";
    main_items.forEach(element => {
        text+=createProduct(element)
    
    });

    let template=`
    <div class="ProductListPage">
    <h1>상품목록</h1>
    <ul>
     ${text}  
    </ul>
    </div>
    `
    renderTemplate(app,template)
    document.querySelector(".ProductListPage").addEventListener('click',ProductClickHandler)
}
const createProduct=(element)=>{

    const {imageUrl,price,name}=element    
    const new_element=`
    <li class="Product">
    <img src="${imageUrl}">
    <div class="Product__info">
      <div>${name}</div>
      <div>${price}~</div>
    </div>
    </li>
    `
    return new_element

}
const RenderOrderPage=async ()=>{
    const user_cart=[...JSON.parse(localStorage.getItem('products_cart'))]
    const product=await fetchData('https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products')
    let text=""
    let total=0
    for(const user_item of user_cart){
        let selected_product_id=user_item.productId
        let selected_option_id=user_item.optionId
        let selected_product_item=product.filter((elem)=>elem.id==selected_product_id)[0]
        let selected_option_item=(await fetchData(`https://h6uc5l8b1g.execute-api.ap-northeast-2.amazonaws.com/dev/products/${selected_product_id}`)).productOptions
        selected_option_item=selected_option_item.filter((elem)=>selected_option_id==elem.id)[0]

        total+=(selected_product_item.price*user_item.quantity)+(selected_option_item.price*user_item.quantity)
    
        text+=`
        <li class="Cart__item">
        <img src=${selected_product_item.imageUrl}>
        <div class="Cart__itemDesription">
        <div>${selected_product_item.name} ${selected_option_item.name} ${user_item.quantity}개</div>
        <div>${(selected_product_item.price*user_item.quantity)+(selected_option_item.price*user_item.quantity)}원</div>
        </div>
        </li>
        `
    }

    let template=`
    <div class="CartPage">
    <h1>장바구니</h1>
    <div class="Cart">
      <ul>
      ${text}
      </ul>
      <div class="Cart__totalPrice">
        총 상품가격 ${total}원
      </div>
      <button class="OrderButton">주문하기</button>
    </div>
    </div>
    `
    renderTemplate(app,template)
    document.querySelector('.CartPage .OrderButton').addEventListener('click',CartOrderClickHandler)

}

const InitPage=()=>{
    RenderMainPage()

}
InitPage()