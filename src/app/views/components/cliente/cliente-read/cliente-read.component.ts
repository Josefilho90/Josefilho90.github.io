import { ClienteService } from './../../../../services/cliente.service';
import { Cliente } from './../../../../models/Cliente';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.scss']
})
export class ClienteReadComponent implements AfterViewInit {

  cliente: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.cliente);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : ClienteService,
    private router : Router) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.cliente = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.cliente);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void{
    this.router.navigate(['clientes/create'])
  }

}
