import axios from 'axios';
import React, {Component, useEffect, useState} from 'react'

function useBest(){
    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }
    
        return false;
    }
    const [selectedData, setSelectedData] = useState([])
    const [AllProduct, setAllProduct] = useState([])
    const [display, setDisplay] = useState([])
    // console.log(useState());
    console.log("connected only this should log");
    axios({
        url: "http://localhost:3003/flash",
        method: "GET"
    }).then(res => {
        // console.log(res.data[0].topProducts);
        if(selectedData.length === 0){            
            setSelectedData(res.data[0].topProducts)
            console.log(selectedData.length);
            console.log(res.data[0].topProducts.length);
        }
    })
    axios({
        url: "http://localhost:3003/api/products",
        method: "GET"
    }).then(response => {
        if(AllProduct.length === 0){
            setAllProduct(response.data)
            // console.log(AllProduct);
        }
    })

    setTimeout(() => {
        if(selectedData.length !== 0 || AllProduct.length !== 0){
            const displayArray = []
            // AllProduct.forEach(product => {
            //     selectedData.forEach(checked => {
            //         if(checked === product._id){
            //             const displayItem = {}
            //             displayItem.checked = true
            //             displayItem.name = product.name
            //             displayItem.id = product._id
            //             displayArray.push(displayItem)
            //         }else{
            //             const displayItem = {}
            //             displayItem.checked = false
            //             displayItem.name = product.name
            //             displayItem.id = product._id
            //             displayArray.push(displayItem)
            //             if(containsObject(displayItem, displayArray)){
            //                 console.log("package already included");
            //             }else{
            //                 console.log("doesn't include");
            //                 console.log(displayArray.includes(displayItem));
            //             }
            //         }
            //     })
            // })
            AllProduct.forEach(product => {
                if(selectedData.includes(product._id)){
                    const displayItem = {}
                    displayItem.checked = true
                    displayItem.name = product.name
                    displayItem.id = product._id
                    displayArray.push(displayItem)
                }else{
                    const displayItem = {}
                    displayItem.checked = false
                    displayItem.name = product.name
                    displayItem.id = product._id
                    displayArray.push(displayItem)
                }
            })
            console.log(AllProduct.length);
            if(display.length === 0){
                // console.log(AllProduct);
                // console.log(displayArray);
                // console.log(AllProduct.concat(displayArray));
                setDisplay(displayArray)
            }
        }
    }, 20)

    window.addEventListener('load', () => {
        document.getElementById("submit").addEventListener("click", (e) => {
            e.preventDefault()
            const topArra = []
            const checked = document.querySelectorAll('input[type="checkbox"]:checked')
            console.log(checked);
            checked.forEach(check => {
                console.log(check.value);
                topArra.push(check.value)
            })
            console.log(topArra);
            axios({
                url: "http://localhost:3003/deleteflash",
                method: "GET"
            })
            axios({
                url: "http://localhost:3003/api/flash",
                method: "POST",
                data: {
                    checkedProduct: topArra
                }
            })
        })
    })

    return(
        <div>
            <form method="submit">
                <h1>Flash Section</h1>
                {/* <input type="checkbox" checked="true" /> */}
                {display.map(product => {
                    if(product.checked){
                        return (
                            <div>
                                  {/* <input type="checkbox" name="vehicle3" value="Boat" defaultChecked="true" /> */}

                                <label>{product.name} </label>  <input type="checkbox" value={product.id} name="selected" defaultChecked={product.checked} />
                            </div>
                        )
                    }else{
                        return (
                            <div>
                            <label>{product.name} </label>  <input type="checkbox" value={product.id} name="selected" />
                            </div>
                        )
                    }
                })}
                {/* <button>hi</button> */}
                <input id="submit" type="submit" className="btn btn-primary" value="Submit" />
            </form>
            
        </div>
    )
}

export default useBest