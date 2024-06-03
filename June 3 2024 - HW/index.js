// filter-----------------------------------
let nums = [1,2,3,4,5,6,7,8,9,10]

// in-built filter-----------------------------------

// let filtered = nums.filter((num)=>{
//     return num>5
// })
// console.log(filtered);

// custom filter--------------------------------------
Array.prototype.myFilter = function(cb, args) {
    let filtered = []
    for (let i = 0; i < this.length; i++) {
        let valid = cb.call(args,this[i],i,this)
        if (valid) {
            filtered.push(this[i])
        }
    }
    return filtered
}

let filterCallbackFunc = function(curr,ind,arr){
    return curr>5
}

let filtered = nums.myFilter(filterCallbackFunc)
console.log(filtered)


// map-----------------------------------

// in-built map-----------------------------------

// let mapped = nums.map((num)=>{
//     return num*10
// })
// console.log(mapped);

// custom map--------------------------------------
Array.prototype.myMap = function(cb, args) {
    let mapped = []
    for (let i = 0; i < this.length; i++) {
        let mappedValue = cb.call(args,this[i],i,this)
        mapped.push(mappedValue)
    }
    return mapped
}

let mapCallbackFunc = function(curr,ind,arr){
    return curr*10
}

let mapped = nums.myMap(mapCallbackFunc)
console.log(mapped)


// includes-----------------------------------

// in-built includes-----------------------------------

// console.log(nums.includes(3));
// console.log(nums.includes(3,5));

// custom includes--------------------------------------
Array.prototype.myIncludes = function(element, start=0) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === element){
            return true
        }
    }
    return false
}

console.log(nums.myIncludes(3));
console.log(nums.myIncludes(3,5));



// indexOf-----------------------------------

// in-built indexOf-----------------------------------

// console.log(nums.indexOf(3));
// console.log(nums.indexOf(3,5));
// console.log(nums.indexOf(10,-1));

// custom indexOf--------------------------------------
Array.prototype.myIndexOf = function(element, start=0) {
    for (let i = start; i < this.length; i++) {
        if (this[i] === element){
            return i
        }
    }
    return -1
}

console.log(nums.myIndexOf(3));
console.log(nums.myIndexOf(3,5));
console.log(nums.myIndexOf(10,-1));


// reduce-----------------------------------

// in-built reduce-----------------------------------

// let reduced1 = nums.reduce((total,curr)=>{
//     return total+curr
// })
// console.log(reduced1);

// let reduced2 = nums.reduce((total,curr)=>{
//     return total+curr
// },10)
// console.log(reduced2);

// custom reduce--------------------------------------
Array.prototype.myReduce = function(cb, accumulator) {
    for (let i = 0; i < this.length; i++) {
        if (accumulator == undefined){
            accumulator = this[0]
            continue
        }
        accumulator = cb(accumulator, this[i],i,this)
    }
    return accumulator
}

let reduced1 = nums.myReduce((total,curr)=>{
    return total+curr
})
console.log(reduced1);

let reduced2 = nums.myReduce((total,curr)=>{
    return total+curr
},10)
console.log(reduced2);


// slice-----------------------------------

// in-built slice-----------------------------------

// console.log(nums.slice(0,3));
// console.log(nums.slice(3,5));
// console.log(nums.slice(-3,-1));
// console.log(nums.slice(-14,-2));
// console.log(nums.slice(-14,-12));

// custom slice--------------------------------------
Array.prototype.mySlice = function(start=0, end=this.length) {
    let sliced = []
    if(start < 0) {
        start+=this.length
        if (start < 0){
            start = 0
        }
    }
    if(end < 0) {
        end+=this.length
        if (end < 0){
            end = 0
        }
    }
    for (let i = start; i < end; i++) {
        sliced.push(this[i])
    }
    return sliced
}

console.log(nums.mySlice(0,3));
console.log(nums.mySlice(3,5));
console.log(nums.mySlice(-3,-1));
console.log(nums.mySlice(-14,-2));
console.log(nums.mySlice(-14,-12));



// splice-----------------------------------

// in-built splice-----------------------------------
nums = [1,2,3,4,5,6,7,8,9,10]
// console.log(nums.splice(1,3));
// console.log(nums);
// console.log(nums.splice(3,-1));
// console.log(nums);
// console.log(nums.splice(-3,2));
// console.log(nums);
// console.log(nums.splice(1,3,99,98));
// console.log(nums);
// console.log(nums.splice(3,-1,99,98));
// console.log(nums);
// console.log(nums.splice(-3,2,99,98));
// console.log(nums);



// custom splice--------------------------------------
Array.prototype.mySplice = function(index, count, ...items) {
    let deleted = []
    if(index<0){
        index+= this.length
    }
    let l = index
    if (count > 0){
        let limit = index + count
        while (l < this.length){
            if (l < limit) {
                deleted.push(this[l])
            }
            if (l+count < this.length){
                this[l] = this[l+count]
            } else {
                delete this[l]
            }
            l+=1
        }
        this.length -= count 
    }

    if (items){
        let end = this.length-1
        this.length += items.length
        for (let i = end; i >= index; i--) {
            this[i+items.length] = this[i] 
        }
        for (let i = 0; i < items.length; i++) {
            this[index+i] = items[i] 
        }
    }
    return deleted
}

nums = [1,2,3,4,5,6,7,8,9,10]
// console.log(nums.mySplice(1,3));
// console.log(nums);
// console.log(nums.mySplice(3,-1));
// console.log(nums);
// console.log(nums.mySplice(-3,2));
// console.log(nums);
// console.log(nums.mySplice(1,3,99,98));
// console.log(nums);
// console.log(nums.mySplice(3,-1,99,98));
// console.log(nums);
// console.log(nums.mySplice(-3,2,99,98));
// console.log(nums);
