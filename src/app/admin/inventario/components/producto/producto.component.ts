import { Component } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
  
})
export class ProductoComponent {
  products:any[] = [
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
    {id:1, nombre:"Teclado", precio:100, categoria_id:5, stock:12},
  ];
  cols:any[] = [
    { field: 'id', header: 'Id' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'precio', header: 'Precio' },
    { field: 'categoria_id', header: 'Categoría' },
    { field: 'stock', header: 'Stock' },
    { field: 'estado', header: 'Estado' }
  ];
  
  exportarProductosPersonalizado() {
    const encabezados = this.cols.map(col => col.header).join(',');
    const filas = this.products.map(product => 
      this.cols.map(col => product[col.field]).join(',')
    );
  
    const csvContent = [encabezados, ...filas].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
  
    // Obtener fecha y hora local de Ecuador
    const now = new Date();
    const fecha = now.toLocaleDateString('es-EC').replace(/\//g, '-'); // Formato: dd-mm-aaaa
    const hora = now.toLocaleTimeString('es-EC', { hour12: false }).replace(/:/g, '-'); // Formato: hh-mm-ss
  
    // Nombre de archivo personalizado con hora local
    link.download = `productos-${fecha}_${hora}.csv`;
  
    link.click();
  }

  openNew(){

  }

  editProduct(prod:any){

  }
  deleteProduct(prod:any){
    
  }

}
