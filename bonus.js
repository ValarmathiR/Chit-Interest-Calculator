import React, { useState } from "react";
export default function Bonus(props)
{
    const [values,setValues]=useState({
        chitvalue:"",
        commission:"",
        totalMonths:"",
        presentMonth:"",
        auction:""
    })
    const [val,setVal]=useState({})
    const handleChange=(e)=>
    {
            let {name,value}= e.target
            setValues({...values,[name]:value})
    }
    const handleClear=()=>
    {
          setValues({
            chitvalue:" ",
            commission:" ",
            totalMonths:" ",
            presentMonth:" ",
            auction:" "})
            setVal("")
    }
    let bmap={}
    const handleSubmit=(e)=>
    {
        e.preventDefault()
      let first=firstInstallment()
      let second=secondInstallment()
      let third=thirdInstallment()
      let auctionVal=auctionValue()
      let bDisplay=[{...auctionVal},{...first},{...second},...third]
      for(let i=0;i<=bDisplay.length;i++)
      {
        Object.assign(bmap,bDisplay[i])
        if(values.presentMonth==bmap.id)
        {
            setVal({...bmap})
        }
      }
    }
    const firstInstallment=()=>{
        let id=1
        let interest=0
        let amount=values.chitvalue
        let installment=amount/values.totalMonths
        let commission=amount*(parseInt(values.commission))/100
        return {id,interest,amount,installment,commission}
    }
    const secondInstallment=()=>{
        let id=2
        let amountValue=(values.chitvalue)*(30/100)
        let amount=values.chitvalue-amountValue
        let installment=amount/values.totalMonths
        let commission=amount*(parseInt(values.commission))/100
        let interest=(100-(amount/values.chitvalue)*100)/100
        return {id,interest,amount,installment,commission}
    }
    const thirdInstallment=()=>{
        let length=values.totalMonths -2
        let prevAmount=(values.chitvalue)*(30/100)
        let value=prevAmount/length
        var oldValue=values.chitvalue-prevAmount
        const array=[]
        for (let i=1;i<=length;i++)
    {
        let id=i+2
        var oldValue=oldValue+value
        let amount=(Math.round(oldValue)*100)/100
        let installment=(Math.round(amount/values.totalMonths)*100)/100
        let commission=(Math.round(amount*(parseInt(values.commission))/100)*100)/100
        let interestVal=(100-(amount/values.chitvalue)*100)/100
        let interest=interestVal.toFixed(2)
        let object= {id,interest,amount,installment,commission}
        array.push(object)
        console.log(array)
    }
    return array
    }

    function auctionValue()
    {
        var auctionedAmount=values.chitvalue-values.auction
        return auctionedAmount
    }
    
return(
        <>
        <div className="split-bonus">
            <div className="bonus-input-field">
                <form onSubmit={handleSubmit}>
                <table className="bonus-table">
                    <tbody>
                    <tr>
                        <td>
                            <div>
                        <label className="label">Chit Value</label><br/>
                        <input type="text" name="chitvalue" value={values.chitvalue} onChange={handleChange} className="input"/>
                        </div>
                        </td>
                        <td>
                            <div>
                        <label className="label">Total Months</label><br/>
                        <input type="text" name="totalMonths" value={values.totalMonths} onChange={handleChange} className="input"/><br/>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                        <label className="label">Commission Percentage %</label><br/>
                        <select type='text' name="commission" value={values.commission} onChange={handleChange} className="input">
                        <option value="1%">1%</option>
                        <option value="2%">2%</option>
                        <option value="3%">3%</option>
                        <option value="4%">4%</option>
                        <option value="5%">5%</option>
                        <option value="6%">6%</option>
                        <option value="7%">7%</option>
                        <option value="8%">8%</option>
                        <option value="9%">9%</option>
                        <option value="10%">10%</option>
                        </select>
                        </div>
                        </td>
                        <td>
                            <div>
                        <label className="label">Present Month</label>
                        <input type="text" name="presentMonth" value={values.presentMonth} onChange={handleChange} className="input"/><br/>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                        <label className="label">Auction amount(Optional)</label>
                        <input type="text" name="auction" value={values.auction} onChange={handleChange} className="input"/><br/>
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div>
                        <button onClick={handleClear} className="header-btn">Clear</button>
                        <input type="button" value="Calculate" onClick={handleSubmit} className="header-btn"/>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </form>
            </div>
            <div className="bonus-table-data" ref={props.amountRef}>
                <table border={1} cellPadding={15} cellSpacing={0}> 
                    <thead>
                    <tr>
                        <th>Amount payable for current month</th>
                        <td>{val.installment}</td>
                        </tr>
                        <tr><th>Interest Value</th>
                        <td>{val.interest}</td>
                        </tr>
                        <tr><th>Amount for auctioned person</th>
                        <td>{val.amount}</td>
                        </tr>
                        <tr>
                        <th>Bonus Amount</th>
                        <td>{val.commission}</td>
                        </tr>
                        </thead>
                </table>
            </div>
        </div>
        </>
        
    )
}