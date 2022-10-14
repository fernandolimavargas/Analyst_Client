import React, { Fragment } from "react"
import Carousel from "react-elastic-carousel"

import "./style.css"

const LoadingCarousel = () => {

    const items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 }
    ]

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
            <Carousel
                itemPadding={[10, 10]}
                pagination={false}
                breakPoints={breakPoints}>
                {items.map(item =>
                    <div className="box-card" key={item.id}>
                    <div className="card card-body">
                        <div className="title-card element-corousel animation-risk-corousel"></div>
                        <i className="element-corousel circle-corousel"></i>
                        <div className="numbers">
                            <div className="open">
                                <div className="element-corousel square-corousel"></div>
                            </div>
                            <div className="closed">
                                <div className="element-corousel square-corousel"></div>
                            </div>
                        </div>
                        <div className="">
                            <div className="element-corousel btn-loading-corousel"></div>
                        </div>
                    </div>
                </div>
                )
                }

            </Carousel>
        </Fragment>
    )
}

export default LoadingCarousel