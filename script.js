    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.myjson.com/bins/hq9bo";
    var arrNum = [];
    var arrPrice = [];
    var saplingsPriceNo,num,totalSaplings;
    var saplingsLeft = [];
    var sum=0;
    var saplingSelect, saplingName
    var saplingType=[];
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var getData = JSON.parse(this.responseText);
            console.log(getData);
            changeView(getData);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function changeView(getData) {
        document.querySelector('.heading').innerHTML = getData.data[0].name;
        document.querySelector('.address').innerHTML = getData.data[0].name + ', ' + getData.data[0].address;
        document.querySelector('.contact').innerHTML = 'Contact No : ' + getData.data[0].contactNumber;
        for(let l=0;l<getData.data.length; l++){
            for(let i=0; i< getData.data[l].saplings.length; i++){ 
                if(l==0){
                    totalSaplings=i;
                 }
                 else{
                    totalSaplings+=1;
                 }
                 if(totalSaplings==5){
                    saplingsPriceNo ='102204';
                 }else{
                    saplingsPriceNo ='102205';
                 }
                
                var saplingPrice = document.querySelector('.saplingPrice-' + totalSaplings);
                var disable=true;
                var disableCreated=document.createAttribute('disabled');
                var btnAdd = document.querySelector('.increase-'+totalSaplings)
                var btnSub = document.querySelector('.decrease-'+totalSaplings);
                arrNum[totalSaplings]=0;
                saplingSelect = document.querySelector('.saplingSelect-' + totalSaplings);
                saplingName = document.querySelector('.saplingName-' + totalSaplings);
                saplingsLeft[totalSaplings] = 1200;
                select('selected',totalSaplings).innerHTML= arrNum[totalSaplings];
                select('selected',totalSaplings).style.paddingRight =50+ 'px';
                select('selected',totalSaplings).style.paddingLeft =50+ 'px';
                disableCreated.value= disable;
                btnSub.setAttributeNode(disableCreated);
                saplingType[totalSaplings]=getData.data[l].saplings[i].types[saplingsPriceNo].name;
                arrPrice.push(getData.data[l].saplings[i].types[saplingsPriceNo].price);
                saplingName.innerHTML = getData.data[l].saplings[i].name;
                saplingPrice.innerHTML = '<span>&#8377; </span>'+arrPrice[totalSaplings];
                saplingPrice.style.color = '#35ba21';
                saplingPrice.style.fontWeight = 700;
                
            }
        }
        for(let e=0;e<=totalSaplings;e++){
            (function(){
                saplingLeft = document.querySelector('.saplingLeft-' + e);
                saplingLeft.innerHTML =  saplingsLeft[e] + '<span> Left</span>';
                document.querySelector('.increase-'+e).style.color = '#17620c';
                document.querySelector('.decrease-'+e).style.color = '#17620c';
                document.querySelector('.decrease-'+e).style.fontWeight = 'bold';
                document.querySelector('.decrease-'+e).style.fontSize = 16+'px';
                document.querySelector('.increase-'+e).style.backgroundColor = 'transparent';
                document.querySelector('.decrease-'+e).style.backgroundColor = 'transparent';
                document.querySelector('.increase-'+e).style.border = 'none';
                document.querySelector('.decrease-'+e).style.border = 'none';
                
                document.querySelector('.increase-'+e).addEventListener('click', function(){
                    increaseBtn(e);
                    saplingLeft = document.querySelector('.saplingLeft-' + e);
                    saplingLeft.innerHTML =  saplingsLeft[e] + '<span> Left</span>';
                }); 
                document.querySelector('.decrease-'+e).addEventListener('click', function(){
                    decreaseBtn(e);
                });
                
            })(e);
        }
    }
    document.querySelector('.reserve').addEventListener('click',function () {
        sum=0;
        var table=document.createElement('table');
        var trr = document.createElement('tr');
        var tda= document.createElement('td');
        var tdb= document.createElement('td');
        var tdc= document.createElement('td');
        var tdd= document.createElement('td');
        tda.innerHTML = 'Sampling Name';
        tdb.innerHTML = 'Sampling Type';
        tdc.innerHTML = 'Sampling Quantity';
        tdd.innerHTML = 'Total Amount';
        trr.appendChild(tda);
        trr.appendChild(tdb);
        trr.appendChild(tdc);
        trr.appendChild(tdd);
        table.appendChild(trr);
        trr.style.fontWeight =700;
        trr.style.borderBottom =2+ 'px ' + 'solid '+ ' #555'; 
        for(let j=0; j<totalSaplings; j++ ){
            if(arrNum[j]>0){
                sum=sum+ arrNum[j]*arrPrice[j];
                var tr= document.createElement('tr');
                var td1= document.createElement('td');
                var td2= document.createElement('td');
                var td3= document.createElement('td');
                var td4= document.createElement('td');
                td1.innerHTML = document.querySelector('.saplingName-' + j).textContent; 
                td2.innerHTML = saplingType[j];
                td3.innerHTML = arrNum[j];
                td4.innerHTML = '<span>&#8377; </span> ' +arrNum[j]*arrPrice[j];
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.style.borderBottom =1+ 'px ' + 'solid '+ ' #777';
                }
            table.appendChild(tr);
            }
        table.appendChild(tr);
        document.querySelector('.modal-body').appendChild(table);
        if(sum>10){
            document.querySelector('.submit').disabled=false;
        }
        else{
            resetForReselect();
            document.querySelector('.submit').disabled=true;
            alert('saplings, please selecte more saplings so that Total amount becomes 10' );
        }
                                                        
    });
    document.querySelector('.submit').addEventListener('click',function () {
        //Reset values After Submition
        resetForReselect();
        alert('You just submitted sucessfully !!!');
        
        
    });

    // Used Functions 

    // Resets all selected sapling and child element to Zero
    function resetForReselect(){
        for(let j=0; j<totalSaplings; j++ ){
            arrNum[j]=0;
            saplingsLeft[j]=1200;
            saplingLeft = document.querySelector('.saplingLeft-' + j);
            saplingLeft.innerHTML =  saplingsLeft[j] + '<span> Left</span>';
            select('selected',j).innerHTML= arrNum[j];
        }
        clearModal();
    }
    function clearModal(){
        var modalBody=document.querySelector('.modal-body');
        var removeChildOfmodalBody = modalBody.lastElementChild;
        modalBody.removeChild(removeChildOfmodalBody);
    }
    function select(className,num){
        return document.querySelector('.'+className+'-'+num);
    }
    function increaseBtn(index){
        arrNum[index]+=1;
        saplingsLeft[index] -=1; 
        if(arrNum[index]>0){
            saplingLeft = document.querySelector('.saplingLeft-' + index);
            saplingLeft.innerHTML =  saplingsLeft[index] + '<span> Left</span>';
            select('selected',index).innerHTML = arrNum[index];
            select('decrease',index).disabled = false;
        }
    }
    function decreaseBtn(index){
        if(arrNum[index]>0){
            arrNum[index]-=1;
            saplingsLeft[index]+=1;
            saplingLeft = document.querySelector('.saplingLeft-' + index);
            saplingLeft.innerHTML =  saplingsLeft[index] + '<span> Left</span>';
            select('selected',index).innerHTML = arrNum[index];
        }
        if(arrNum[index]==0) {
          select('decrease',index).disabled =true;
        }
    }