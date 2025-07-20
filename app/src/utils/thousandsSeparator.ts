function addThousandSeparator(num:number):string {
    if (isNaN(num)||typeof(num)!="number") {
        throw new Error("Must be a valid number.")
    }

    const [integerPart, decimalPart] = num.toString().split(".")
    
    let formatterInteger = ""
    
    for (let i = integerPart.length - 1; i >= 0; i--){
        formatterInteger = integerPart[i] + formatterInteger
        
        if ((integerPart.length - i) % 3 === 0 && i !== 0) {
            formatterInteger=","+formatterInteger
        }
    }

    return decimalPart?`${formatterInteger}.${decimalPart}`:formatterInteger

}

export default addThousandSeparator