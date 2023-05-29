import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { Component } from "react"

export type ISidebarGroup = {
    title : string
    pages : ISidebarPage[]
    icon : React.ReactElement
}

export type ISidebarPage = {
    name : string
    path : string
    icon? : () => any
}


export type DtoCreateSportCenter = {
    fullName : string
    telephone : string
    email : string
    name : string
    photo : File | null
    latitude : string
    longitude : string
    address : string
    openingHour : number
    closingHour : number
}
export type DtoEditSportCenter = {
    id : string
    name : string
    photo : File | null
    latitude : string
    longitude : string
    address : string
}

export type DtoCreateSportCourt = {
    name : string
    photo : File | null
    description : string
    price : number
    width : number
    long : number
    materialId : string
}
export type DtoEditSportCourt = {
    id : string
    name : string
    photo : File | null
    description : string
    price : string
    businessHours : string
}

export type ISidebarItems = ISidebarPage | ISidebarGroup


export type ResponseReservation = {
    id : string
    date : string
    hourStart : string
    hourEnd : string
    sportCourtId : string
    userId : string
    total : number
    sportCourtName : string
    userName : string
    payed : boolean
    methodPayment : MethodPayment
}

export type ResponseReservationsBySportCourt = {
    id : string
    date : string
    hourStart : string
    hourEnd : string
    sportCourtId : string
    userId : string
}

export type DtoCreateReservation = {
    date : string
    hourStart : number
    hourEnd : number
    sportCourtId : string
    userId : string
    total : number
    chargeCode : string
    // methodPayment : string
}

export type DtoUpdateReservation = {
    id : string
    total : number
}

// classes
export type RoleEnum = "BackOffice" | "Administrator" | "Player"

export type User = {
    id : string
    fullName : string
    telephone : string
    email : string
    password? : string
    role : RoleEnum
}

export type SportCenter = {
    id? : string
    name : string
    photo : string
    latitude : string
    longitude : string
    address : string
    openingHour : number
    closingHour : number
    adminId : string
}

export type SportCourt = {
    id : string
    name : string
    photo : string
    description : string
    price : number
    width : number
    long : number
    sportCenterId : string
    materialId : string
}

export type MethodPayment = "Efectivo" | "Online"

export type Reservation = {
    id : string
    date : string
    hourStart : string
    hourEnd : string
    sportCourtId : string
    userId : string
    total : number
    payed : boolean
    methodPayment : MethodPayment
}


export type Material = {
    id : string
    name : string 
}