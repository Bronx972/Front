import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent {

  uploadFiles: Array<File> = [];

  


  productoForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _productoService: ProductoService){
    this.productoForm = this.fb.group({
        producto:  ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio:    ['', Validators.required],
        imagen:    ['', Validators.required],
    })
  }

  onFileChange(e: any){
    //console.log(e);
    this.uploadFiles = e.target.files;
  }

  agregarProductFile(){
    let formData = new FormData();

    formData.append("producto", this.productoForm.get('producto')?.value);
    formData.append("categoria", this.productoForm.get('categoria')?.value);
    formData.append("ubicacion", this.productoForm.get('ubicacion')?.value);
    formData.append("precio", this.productoForm.get('precio')?.value);

    for (let i = 0; i < this.uploadFiles.length; i++) {
      formData.append("uploads[]", this.uploadFiles[i], this.uploadFiles[i].name);
    }

  
    Swal.fire({
      title: 'Creacion de Producto',
      text: "¿Desea crear el producto?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.guardarProductoFile(formData).subscribe(data =>{
          console.log(data);  
          this.router.navigate(['/listar-productos'])
        }) 
      }
    })
    // this._productoService.uploadFile(formData).subscribe((res) => {
    //   console.log('Response:', res);
    // });
  }



  // agregarProducto(){
  //   const PRODUCTO: Producto = {
  //     producto: this.productoForm.get('producto')?.value,
  //     categoria: this.productoForm.get('categoria')?.value,
  //     ubicacion: this.productoForm.get('ubicacion')?.value,
  //     precio: this.productoForm.get('precio')?.value,
  //     imagen: this.productoForm.get('imagen')?.value
  //   }

  //   // console.log(PRODUCTO)

  //   Swal.fire({
  //     title: 'Creacion de Producto',
  //     text: "¿Desea crear el producto?",
  //     icon: 'info',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Aceptar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._productoService.guardarProducto(PRODUCTO).subscribe(data =>{
  //         console.log(data);  
  //         this.router.navigate(['/listar-productos'])
  //       }) 
  //     }
  //   })

    
  // }

    //console.log(this.productoForm)
  

}
