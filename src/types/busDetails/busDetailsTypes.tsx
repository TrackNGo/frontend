interface BusDetailsType{
    alert:never[]
    busNumber:string,
    startLocation:string,
    endLocation:string,
    routeNumber:string,
    fareEstimate:string,
    status:boolean,
    type?:string
}

export default BusDetailsType