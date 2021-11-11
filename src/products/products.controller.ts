import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{
    constructor(private readonly productService: ProductsService){}

    @Post()
    // ez a @Body olyan mint a const {title, description, price} =req.body
    addProduct(
        // így is lehet
        // @Body() completeBody: {title: string, description: string, price: string}
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number): any {
        const generateId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        
        return {id: generateId}
    }

    @Get()
    getAllProducts(){
        return this.productService.getPoducts()
    }

    @Get(":id")
    getProduct(@Param("id") prodId: string) {
        return this.productService.getSingleProduct(prodId)
    }

    @Patch(":id")
    updateProduct(
        @Param("id") prodId: string,
        @Body("title") prodTitle: string, 
        @Body("description") prodDesc: string, 
        @Body("price") prodPrice: number
        ) {
        this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice )
        return null
    }

    @Delete(":id")
    deleteProduct(@Param("id") prodId: string){
        this.productService.deleteProduct(prodId);
        return null;
    }
}