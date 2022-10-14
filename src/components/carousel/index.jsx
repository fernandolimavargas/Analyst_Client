import React, { Fragment, useEffect, useState } from "react"
import Carousel from "react-elastic-carousel"
import LoadingCarousel from "./loadingCarousel"

import { BsBug } from "react-icons/bs"
import { IoBuildOutline, IoHelpBuoyOutline } from "react-icons/io5"
import { MdAttachMoney } from "react-icons/md"
import { TbHeadset, TbDatabaseImport } from "react-icons/tb"
import { FiShare2 } from "react-icons/fi"
import { VscTriangleLeft } from "react-icons/vsc"
import { BiDna } from "react-icons/bi"
import { RiDatabaseLine } from "react-icons/ri"

import { requestCardsInformation } from "../../services/api"

import "./style.css"

const DomCarousel = (props) => {
    const [queuesCards, setQueuesCard] = useState()

    useEffect(() => {
        requestCardsInformation()
            .then((resp) => {
                const items = [
                    { id: 1, title: "Erro", reqOpen: resp.data[0]["aberto"], reqClose: resp.data[0]["fechado"], urlSol: `/request/${props.tipo}/Error`, icon: <BsBug id="BsBug" /> },
                    { id: 2, title: "Alteração", reqOpen: resp.data[1]["aberto"], reqClose: resp.data[1]["fechado"], urlSol: `/request/${props.tipo}/Alteration`, icon: <IoBuildOutline id="IoBuildOutline" /> },
                    { id: 3, title: "Customização", reqOpen: resp.data[2]["aberto"], reqClose: resp.data[2]["fechado"], urlSol: `/request/${props.tipo}/Customization`, icon: <MdAttachMoney id="MdAttachMoney" /> },
                    { id: 4, title: "Script", reqOpen: resp.data[3]["aberto"], reqClose: resp.data[3]["fechado"], urlSol: `/request/${props.tipo}/Script`, icon: <TbDatabaseImport id="TbDatabaseImport" /> },
                    { id: 5, title: "Serviço", reqOpen: resp.data[4]["aberto"], reqClose: resp.data[4]["fechado"], urlSol: `/request/${props.tipo}/Service`, icon: <TbHeadset id="TbHeadset" /> },
                    { id: 6, title: "Importação", reqOpen: resp.data[5]["aberto"], reqClose: resp.data[5]["fechado"], urlSol: `/request/${props.tipo}/Import`, icon: <RiDatabaseLine id="RiDatabaseLine" /> },
                    { id: 7, title: "Share", reqOpen: resp.data[6]["aberto"], reqClose: resp.data[6]["fechado"], urlSol: `/request/${props.tipo}/Share`, icon: <FiShare2 id="FiShare2" /> },
                    { id: 8, title: "CCM Ticket", reqOpen: resp.data[7]["aberto"], reqClose: resp.data[7]["fechado"], urlSol: `/request/${props.tipo}/Ticket`, icon: <VscTriangleLeft id="VscTriangleLeft" /> },
                    { id: 9, title: "ISSUE Interna", reqOpen: resp.data[8]["aberto"], reqClose: resp.data[8]["fechado"], urlSol: `/request/${props.tipo}/InternalIssue`, icon: <BiDna id="BiDna" /> },
                    { id: 10, title: "HELP", reqOpen: resp.data[9]["aberto"], reqClose: resp.data[9]["fechado"], urlSol: `/request/${props.tipo}/Help`, icon: <IoHelpBuoyOutline id="IoHelpBuoyOutline" /> }
                ]

                setQueuesCard(items)
            })
    }, [])

    const breakPoints = [
        { width: 430, itemsToShow: 1 },
        { width: 500, itemsToShow: 2 },
        { width: 680, itemsToShow: 3 },
        { width: 750, itemsToShow: 4 },
        { width: 983, itemsToShow: 5 },
        { width: 1200, itemsToShow: 6 }
    ]

    return (
        <Fragment>
            {queuesCards == undefined ?
                <LoadingCarousel />
                :
                <Carousel
                    itemPadding={[10, 10]}
                    pagination={false}
                    breakPoints={breakPoints}>
                    {queuesCards !== undefined &&
                        queuesCards.map(item =>
                            <div className="box-card" key={item.id}>
                                <div className="card card-body">
                                    <span className="title-card">{item.title}</span>
                                    <i>{item.icon}</i>
                                    <div className="numbers">
                                        <div className="open">
                                            <span>{item.reqOpen}</span>
                                            <span>Abertos</span>
                                        </div>
                                        <div className="closed">
                                            <span>{item.reqClose}</span>
                                            <span>Fechados</span>
                                        </div>
                                    </div>
                                    <div className="btn btn-carousel">
                                        <a href={item.urlSol}>
                                            {props.text}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Carousel>}

        </Fragment>
    )
}

export default DomCarousel