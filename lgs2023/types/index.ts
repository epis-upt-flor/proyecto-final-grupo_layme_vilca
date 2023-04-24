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
    price : string
    businessHours : string
    // businessHours : []
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
    adminId : string
}

export type SportCourt = {
    id : string
    name : string
    photo : string
    description : string
    price : string
    businessHours : string
    sportCenterId : string
}
