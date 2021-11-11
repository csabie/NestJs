import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): any{
        const prodId = Math.random().toString(); //itt egy jwt-t érdemes generálni, de a példa kedvéért jó ez is
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);

        return {id: prodId}
    }

    getPoducts(){
        //így biztonságos, hogy így adjuk vissza, mint egy copy-t
        return [...this.products]
    }

    getSingleProduct(productId: string){
        // const product = this.products.find(x => x.id===productId);
        // if(!product){
        //     throw new NotFoundException('Could not find product.');//automaikus 404 errort dob
        // }
        // return {...product};
        const product = this.findProduct(productId)[0]; //itt egy tömböt ad vissza
        return {...product}
    }

    updateProduct(productId: string, title: string, desc: string, price: number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};

        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct

    }

    deleteProduct(prodId: string){
        //itt akkor használunk (_) alulvonást, amikor nem elhanyagolhatjuk az egyik property-t de mégis array deconstruction-t akarunk használni
        // tulajdonképpen ezt is használhatjuk: const index = this.findProduct(prodId)[1];
        const [_, index] = this.findProduct(prodId);
        //index arra kell, hogy tudjuk, hogy hol van az amit ki akarunk törölni, az 1 pedig, hogy hányat
        this.products.splice(index, 1);


    }

    private findProduct(id: string) : [Product, number]{
        const productIndex = this.products.findIndex(x => x.id===id);
        const product = this.products[productIndex];

        if(!product){
            throw new NotFoundException('Could not find product.');//automaikus 404 errort dob
        }

        return [product, productIndex]
    }

   
}