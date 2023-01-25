import { Router } from "express";
import { readAllCat, readCat, createCat, updateCat, updatePartiallyCat, deleteCat } from "./cats.service";

const router = Router();

//* 모든 고양이 데이터 조회(GET)
router.get("/cats", readAllCat);

//* 특정 고양이 데이터 조회(GET)
router.get("/cats/:id", readCat);

//* 새 고양이 추가(POST)
router.post("/cats", createCat);

//* 고양이 데이터 전체 업데이트(PUT)
router.put("/cats/:id", updateCat);

//* 고양이 데이터 일부분 업데이트(PATCH)
router.patch("/cats/:id", updatePartiallyCat);

//* 고양이 데이터 삭제(DELETE)
router.delete("/cats/:id", deleteCat);

export default router;