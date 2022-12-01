import React, { useState } from "react";
export default function Auctionamount(props)
{
    const [values,setValues]=useState({
        chitvalue:"",
        commission:"",
        totalMonths:"",
        presentMonth:""
    })
    const [display,setDisplay]=useState([])
    const [isDisabled,setisDisabled]=useState(false)
    const handleChange=(e)=>{
          let {name,value}=e.target
          setValues({...values,[name]:value})
    }
    const handleClear=()=>
    {
          setValues({
            chitvalue:"",
        commission:"",
        totalMonths:"",
        presentMonth:""
          })  
        setDisplay([])
    }
    const handleSubmit=(e)=>
    {
        e.preventDefault()
      let first=firstInstallment()
      let second=secondInstallment()
      let third=thirdInstallment()
      setDisplay([...display,{...first},{...second},...third])
      setisDisabled(true)
    }
    const firstInstallment=()=>{
        let interest=0
        let amount=values.chitvalue
        let installment=amount/values.totalMonths
        let commission=amount*(parseInt(values.commission))/100
        return {interest,amount,installment,commission}
    }
    const secondInstallment=()=>{
        let amountValue=(values.chitvalue)*(30/100)
        let amount=values.chitvalue-amountValue
        let installment=amount/values.totalMonths
        let commission=amount*(parseInt(values.commission))/100
        let interest=(100-(amount/values.chitvalue)*100)/100
        return {interest,amount,installment,commission}
    }
    const thirdInstallment=()=>{
        let length=values.totalMonths -2
        let prevAmount=(values.chitvalue)*(30/100)
        let value=prevAmount/length
        var oldValue=values.chitvalue-prevAmount
        const array=[]
        for (let i=1;i<=length;i++)
    {
        var oldValue=oldValue+value
        let amount=(Math.round(oldValue)*100)/100
        let installment=(Math.round(amount/values.totalMonths)*100)/100
        let commission=(Math.round(amount*(parseInt(values.commission))/100)*100)/100
        let interestVal=(100-(amount/values.chitvalue)*100)/100
        let interest=interestVal.toFixed(2)
        let object= {interest,amount,installment,commission}
        array.push(object)
        console.log(array)
    }
    return array
 
    }
    return(
        <>
        <div className="split">
            <div className="input-field">
                <form onSubmit={handleSubmit}>
              <label className="label">Chit Value</label><br/>
              <input type="text" name="chitvalue" value={values.chitvalue} onChange={handleChange} className="input"/><br/>
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
              </select><br/>
              <label className="label">Total Months</label><br/>
              <input type="text" name="totalMonths" value={values.totalMonths} onChange={handleChange} className="input"/><br/>
              <label className="label">Present Month</label><br/>
              <input type="text" name="presentMonth" value={values.presentMonth} onChange={handleChange} className="input"/><br/><br/>
              <input type="button" value="Clear" onClick={handleClear} className="header-btn"/>&emsp;
              <input type="button" value="Calculate" onClick={handleSubmit.bind(this)} className="header-btn" disabled={isDisabled}/>
              </form>
            </div> 
            <div className="table-data" ref={props.amountRef}>
                <table>
                    <div className="bg">
                        <p>S.No</p>
                        <p>Interest</p>
                        <p>Auctioned Amount</p>
                        <p>Installment</p>
                        <p>Commission</p>
                    </div>

            {
                    display.map((displays,index)=>
                    <div key={index} className="firstmap">
                    <p>{index+1}</p>
                    <p>{displays.interest}</p>
                    <p>{displays.amount}</p>
                    <p>{displays.installment}</p>
                    <p>{displays.commission}</p>
                    </div>
                    )
            }
                    </table>
                    </div>
                    </div>
                    </>
    )
}
