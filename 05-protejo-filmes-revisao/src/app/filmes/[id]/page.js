'use client'

import apiFilmes from '@/app/apis/apiFilmes'
import Pagina from '@/app/components/Pagina'
import { useEffect, useState } from 'react'
import { CardImg, Col, Row } from 'react-bootstrap'

export default function page(props) {

    const id = props.params.id
    const [filme, setFilme] = useState({})


    useEffect(() => {
        buscarFilme()
    }, [])

    async function buscarFilme() {
        const resultado = await apiFilmes.get('/movie/' + id + '?language=pt-BR')
        console.log(resultado.data)
        setFilme(resultado.data)
    }


    return (
        <Pagina titulo={filme.title}>

            {filme.id && (
                <>
                    <Row className='mt-2'>
                        {/* Imagem do poster do filme */}
                        <Col md={3}>
                            <CardImg src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} />
                        </Col>

                        {/* Informações do filme */}
                        <Col m={9}>
                            <p><b>Orçamento:</b> {filme.revenue} $</p>
                            <p><b>Data de Lançamento:</b> {filme.release_date}</p>
                            <p><b>Duração:</b> {filme.runtime} min</p>
                            <p><b>Nota:</b> {filme.vote_average} ⭐</p>

                            <p><b>Generos:</b></p>
                            <ul>
                                {filme.genres.map(item => {
                                    return <li>{item.name}</li>
                                })}

                            </ul>

                            <p><b>Sinopse:</b> {filme.overview}</p>
                        </Col>
                    </Row>
                </>
            )}

        </Pagina>
    )

}
