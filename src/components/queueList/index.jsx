import React, { Fragment, useState, useEffect } from "react"

import { generalQueuesInformation } from "../../services/api"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import LoadingQueuesList from "./loadingQueuesList"

import { BsCircleFill } from "react-icons/bs"
import { BiLinkExternal } from "react-icons/bi"

import "./style.css"

const QueueList = () => {

    const [queues, setQueues] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const updateValuesQueues = () => {
        let values = JSON.parse(localStorage.getItem("valuesQueues"))
        let order = JSON.parse(localStorage.getItem("orderQueues"))

        let auxValues = order.map(obj => values.find(i => i.name === obj.name))

        localStorage.setItem("orderQueues", JSON.stringify(auxValues))
        setQueues(JSON.parse(localStorage.getItem("orderQueues")))
    }

    useEffect(() => {
        generalQueuesInformation()
            .then((resp) => {
                localStorage.setItem("valuesQueues", JSON.stringify(resp.data))
                let orderLocalStorage = localStorage.getItem("orderQueues")

                if (orderLocalStorage && orderLocalStorage.length >= 11) {
                    setQueues(JSON.parse(localStorage.getItem("orderQueues")))
                    updateValuesQueues()
                } else {
                    setQueues(resp.data)
                }
                setIsLoading(true)
            })
    }, [])

    const handleOnDragEnd = (result) => {
        const items = Array.from(queues)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        localStorage.setItem("orderQueues", JSON.stringify(items))
        setQueues(items)
    }

    return (
        <Fragment>
            <div className="container-queues">
                <div className="queue-list-header">
                    <p className="title-card title-control-queues">Controle de Filas</p>
                </div>
                {!isLoading ? <LoadingQueuesList /> :
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="container-list">
                            {(provided) => {
                                return (
                                    <div className="container-list"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}>
                                        {queues.map(({ id, name, P0, P1, P2, P3, qtd_tp }, index) => {
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided, snapshot) => {
                                                        const CSS = {
                                                            backgroundColor: snapshot.isDragging ? "#e7e4e4" : "#FFF",
                                                            ...provided.draggableProps.style
                                                        }
                                                        return (
                                                            <div className="queue-list"
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                style={CSS}>
                                                                <a href="#" target="_blank" id="icon-mnt-queues"><BiLinkExternal /></a>
                                                                <p id="title-queues">{name}</p>
                                                                <span>
                                                                    <BsCircleFill className="p0" />
                                                                    {P0}
                                                                    <BsCircleFill className="p1" />
                                                                    {P1}
                                                                    <BsCircleFill className="p2" />
                                                                    {P2}
                                                                    <BsCircleFill className="p3" />
                                                                    {P3}
                                                                </span>
                                                                <p id="qtd-tps">Chamados na fila: {qtd_tp}</p>
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                    </DragDropContext>
                }
            </div>
        </Fragment>
    )
}

export default QueueList