import "./style.css"

function PrintButton(){
    const handleClick = () => window.print()
    return(
        <button className="print__btn" onClick={handleClick}>Print</button>
    )
}

export default PrintButton