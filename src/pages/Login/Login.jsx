import {BellElectric} from "lucide-react"
import {Link} from "react-router-dom"

export default function Login(){

    //aqui ta o nosso front-end
    return(
        <>
            <main className="Login">
                <section className="Login_Section">

                    <div className="Login_Title">
                        <BellElectric />
                        <h1>GradeUp</h1>
                        <p>Sistema de gerenciamento de notas</p>
                    </div>

                    <div className="Login_Card">
                        <form className="Login_Form">
                            {/*Aqui vamos colocar os comnentes dos campos de cadastro*/}

                            <Link>
                                {/*Colocar o link de esqueci senha*/}
                            </Link>

                            <button className="Login_Entrar">
                                Entrar
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}