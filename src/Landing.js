import React, { Component } from "react";
class Landing extends Component {
    constructor() {
        super();
        this.state = {
            principal: "",
            principal2: "",
            rate: "",
            rate2: "",
            def: "",
            loans: [],
            defaultLoan: [],
            total_profit: null,
            total_profit_default: null
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmitother = e => {
        e.preventDefault();
        this.setState({
            loans: []
        })
        var loans = []
        var principal = parseFloat(this.state.principal2)
        var rate = parseFloat(this.state.rate2)
        var def = parseFloat(this.state.def)
        var collateral = principal
        var i = 0
        var total_interest = 0.0
        var interest = 0.0
        var previous_interest = 0.0
        let topro = 0
        while (def >= i) {
            i += 1
            console.log("Borrowing Loan no ", i)
            console.log("Principal: ", principal, "Collateral: ", collateral)
            interest = principal * (rate / 100)
            total_interest += interest
            loans.push({ "loan": i, "principal": principal, "collateral": collateral, "interest": interest, "total_interest": total_interest })
            console.log("Repaying Loan: ")
            console.log("Interest: ", interest, "Total_Interest: ", total_interest)
            console.log("i: ", i)
            if (i > def) {
                console.log("p: ", principal, "c: ", collateral, "ti: ", (total_interest - interest))
                topro = ((total_interest - interest) + collateral) - principal
                break
            }
            principal = principal + (interest / 3)
            collateral = collateral - ((interest + previous_interest) / 3)
            previous_interest = interest
            console.log("break: ")

        }


        this.setState({
            defaultLoan: loans,
            total_profit_default: topro
        })

    };

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            defaultLoan: []
        })
        var loans = []
        var principal = parseFloat(this.state.principal)
        var rate = parseFloat(this.state.rate)
        var collateral = principal
        var i = 0
        var total_interest = 0.0
        var interest = 0.0
        var previous_interest = 0.0

        while (collateral > 0) {
            i += 1
            console.log("Borrowing Loan no ", i)
            console.log("Principal: ", principal, "Collateral: ", collateral)
            interest = principal * (rate / 100)
            total_interest += interest
            loans.push({ "loan": i, "principal": principal, "collateral": collateral, "interest": interest, "total_interest": total_interest })
            console.log("Repaying Loan: ")
            console.log("Interest: ", interest, "Total_Interest: ", total_interest)
            principal = principal + (interest / 3)
            collateral = collateral - ((interest + previous_interest) / 3)
            previous_interest = interest
        }
        let topro = total_interest - (principal - (interest / 3))
        this.setState({
            loans: loans,
            total_interest: topro
        })

    };

    render() {
        console.log(this.state.loans)
        var allLoans = this.state.loans.map((val, key) => (
            <div class="row" key={key}>
                <div class="col s12 m9">
                    <div class="card #ff1744 red accent-3">
                        <div class="card-content white-text" style={{ fontFamily: "caudex" }}>
                            <span class="card-title">Loan number {val.loan}</span>
                            <p style={{ fontSize: "18px" }}>Principal: {val.principal} </p>
                            <p style={{ fontSize: "18px" }}>Collateral: {val.collateral} </p>
                            <p style={{ fontSize: "18px" }}>Interest: {val.interest} </p>
                            <p style={{ fontSize: "18px" }}>Total Interest: {val.total_interest} </p>
                        </div>
                    </div>
                </div>
            </div>
        ))

        var allloans2 = this.state.defaultLoan.map((val, key) => (
            <div class="row" key={key}>
                <div class="col s12 m9">
                    <div class="card #d500f9 purple accent-3">
                        <div class="card-content white-text" style={{ fontFamily: "caudex" }}>
                            <span class="card-title">Loan number {val.loan}</span>
                            <p style={{ fontSize: "18px" }}>Principal: {val.principal} </p>
                            <p style={{ fontSize: "18px" }}>Collateral: {val.collateral} </p>
                            <p style={{ fontSize: "18px" }}>Interest: {val.interest} </p>
                            <p style={{ fontSize: "18px" }}>Total Interest: {val.total_interest} </p>
                        </div>
                    </div>
                </div>
            </div>
        ))

        return (
            <div style={{ paddingTop: "10rem" }}>
                <div class="row">
                    <div class="col s5 push-s7">
                        {allLoans}
                        {allloans2}
                    </div>
                    <div class="col s7 pull-s4">
                        <div class="row">
                            <div class="col s12">
                                <div class="row center-align" >
                                    <div class="col">
                                        <div class="card #ff1744 red accent-3 center-align">
                                            <div class="card-content white-text">
                                                <span class="card-title">Loans Until Zero Collateral</span>
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col s8 offset-s2">
                                                            <form noValidate onSubmit={this.onSubmit}>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        onChange={this.onChange}
                                                                        value={this.state.principal}
                                                                        id="principal"
                                                                        type="number"
                                                                    />
                                                                    <label htmlFor="principal">Principal</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        onChange={this.onChange}
                                                                        value={this.state.rate}
                                                                        id="rate"
                                                                        type="number"
                                                                    />
                                                                    <label htmlFor="rate">Rate</label>
                                                                </div>
                                                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                                                    <button
                                                                        style={{
                                                                            width: "150px",
                                                                            borderRadius: "3px",
                                                                            letterSpacing: "1.5px",
                                                                            marginTop: "1rem"
                                                                        }}
                                                                        type="submit"
                                                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                                                    >
                                                                        Calculate
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="valign-wrapper">
                            <span style={{ fontSize: "21px", paddingBottom: "15px" }}>
                                {this.state.total_interest ?
                                    "Total Net Profit: " + this.state.total_interest : ""}
                            </span>
                        </div>
                        <div class="row">
                            <div class="col m9">
                                <div class="row center-align" >
                                    <div class="col">
                                        <div class="card purple accent-3 center-align">
                                            <div class="card-content white-text">
                                                <span class="card-title">Loan Default</span>
                                                <div className="">
                                                    <div className="row">
                                                        <div className="col s8 offset-s2">
                                                            <form noValidate onSubmit={this.onSubmitother}>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        onChange={this.onChange}
                                                                        value={this.state.principal2}
                                                                        id="principal2"
                                                                        type="number"
                                                                    />
                                                                    <label htmlFor="principal">Principal</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        onChange={this.onChange}
                                                                        value={this.state.rate2}
                                                                        id="rate2"
                                                                        type="number"
                                                                    />
                                                                    <label htmlFor="rate">Rate</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        onChange={this.onChange}
                                                                        value={this.state.def}
                                                                        id="def"
                                                                        type="number"
                                                                    />
                                                                    <label htmlFor="def">Default</label>
                                                                </div>

                                                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                                                    <button
                                                                        style={{
                                                                            width: "150px",
                                                                            borderRadius: "3px",
                                                                            letterSpacing: "1.5px",
                                                                            marginTop: "1rem"
                                                                        }}
                                                                        type="submit"
                                                                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                                                    >
                                                                        Calculate
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="valign-wrapper">
                            <span style={{ fontSize: "21px" }}>
                                {this.state.total_profit_default ?
                                    "Total Net Profit: " + this.state.total_profit_default : ""}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;