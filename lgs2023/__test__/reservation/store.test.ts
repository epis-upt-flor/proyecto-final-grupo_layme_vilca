import GetSportCourtList from "@/pages/api/sportcourts/list";
import StoreSportCourt from "@/pages/api/sportcourts/store"
import { testClient } from "testclient/client";
import {beforeAll, describe, expect, it, test} from '@jest/globals';
import { DtoCreateSportCourt, SportCourt } from "types";
import sinon from 'sinon'
import supertest from "supertest";
describe("CRUD sportcourt",() => {

    let sportCourt : SportCourt | null = null
    beforeAll(async () => {
        if(sportCourt){
            await supertest("/api").post(`/sportcourt/delete/`).send(sportCourt.id).end(function(err,res){
                sportCourt = null
            })
        }
      })


    it("GET /api/sportcourts should returns list", async () => {
        const result = await testClient(GetSportCourtList).get("/api/sportcourts").expect(200);
        expect(result.body.length).toEqual(2)
    });

    it("POST /api/sportcourts/store should returns a new object", async () => {

        const toSend : DtoCreateSportCourt = {
            description : "",
            long : 0,
            materialId : "",
            name : "",
            photo : null,
            price : 0,
            width : 0,
        }

        // const expected : SportCourt = {
        //     id : "qwertyiopsdaaobn" ,
        //     long : toSend.long ,
        //     description : toSend.description,
        //     materialId : toSend.materialId,
        //     name : toSend.name,
        //     photo : "myfiletest.jpg",
        //     price : toSend.price,
        //     sportCenterId : "qwepoisfdpodsgi",
        //     width : toSend.width
        // } as SportCourt
        
        
        await testClient(StoreSportCourt)
            .post("/api/sportcourts/store")
            .send(toSend)
            .expect(201)
            .end(function(err,res){
                sportCourt = res.body as SportCourt
                expect(sportCourt.id.length).toBeGreaterThan(10)
            })
    });
})