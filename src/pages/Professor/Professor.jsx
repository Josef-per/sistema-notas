//import area

export default function ProfessorDashboard(){
    
    //Front-end da nossa tela
    //Temos que definir uma logo e um nome descente pra isso, além de definir todos os icons 
    return(
        <>
            {/*Esse side nav ele vai virar um componente futuramente*/}
            <nav className="Side-Nav">
                <div className="Side-Nav_Logo">
                    <Icon></Icon>
                    <h1>Notas</h1>
                </div>

                <div className="Side-Nav_Itens">
                    <p>Professor</p>
                    <div className="Side-Nav_Iten">
                        <Icon></Icon>
                        <span>Dashboard</span>
                    </div>
                </div>

                <div className="Side-Nav_Bottom">
                    <Link>
                        <Icon></Icon>
                        <span>Sair</span>
                    </Link>
                </div>

            </nav>
            <main className="Dashboard">

                <div className="Dashboard_Cards">
                    
                    {/*Puxar a informação do h2 do banco, ele sempre vai ser puxado por alguma coisa
                        Além disso criar um componente para os cards e suas variações
                        
                        Criar o card type 1 - 3
                        e colocar o type dele como prop talvez seja a melhor forma pq a lógica dele fica 
                        separada daqui, mas analisar isso futuramente
                    */}
                    <div className="Dashboard_Card">
                        <p>Total de alunos</p>
                        <h2>2</h2>
                        <p>matriculados</p>
                    </div>

                </div>

                <div className="Dashboard_Registers">
                    <div className="Registers_Title">
                        <h3>Últimas notícias</h3>
                        <Link>
                            <span>Ver Todos</span>
                        </Link>
                    </div>

                    <div className="Registers_Fields">
                        <span>Nome: </span>
                        <span>Nota Final: </span>
                        <span>Situação: </span>
                        <span>Ações: </span>
                    </div>

                    <div className="Registers_Field">
                        {/*Essa info vai ter que vim do banco*/}
                    </div>
                </div>
            </main>
        </>
    )
}