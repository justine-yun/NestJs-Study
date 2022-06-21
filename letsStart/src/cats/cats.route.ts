import { Cat, CatType } from "./cats.model";
import { Router } from "express";

const router = Router();

//* 모든 고양이 데이터 조회(GET)
router.get("/cats", (req, res) => {
  try {
    const cats: CatType[] = Cat;
    res.status(200).send({
      success: true,
      data: { cats }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

//* 특정 고양이 데이터 조회(GET)
router.get("/cats/:id", (req, res) => {
  try{
    const params = req.params;
    console.log(params);
    const cat = Cat.find((cat) => {
      return cat.id === params.id;
    });
    res.status(200).send({
      success: true,
      data: { cat }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

//* 새 고양이 추가(POST)
router.post("/cats", (req, res) => {
  try{
    const data = req.body;
    Cat.push(data);
    res.status(200).send({
      success: true,
      data: { data }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

//* 고양이 데이터 전체 업데이트(PUT)
router.put("/cats/:id", (req, res) => {
  try{
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach(cat => {
      if(cat.id === params.id){
        cat = body;
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: { result }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

//* 고양이 데이터 일부분 업데이트(PATCH)
router.patch("/cats/:id", (req, res) => {
  try{
    const params = req.params;
    const body = req.body;
    let result;
    Cat.forEach(cat => {
      if(cat.id === params.id){
        cat = {...cat, ...body};
        result = cat;
      }
    });
    res.status(200).send({
      success: true,
      data: { result }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

//* 고양이 데이터 삭제(DELETE)
router.delete("/cats/:id", (req, res) => {
  try{
    const params = req.params;
    const newCat = Cat.filter(cat => cat.id !== params.id);
    res.status(200).send({
      success: true,
      data: { newCat }
    });
  }
  catch(error){
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

export default router;