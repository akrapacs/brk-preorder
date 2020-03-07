import React from 'react';
import { Media } from './media';
import { Button, ButtonGroup } from 'react-bootstrap';
import ModalImage from 'react-modal-image';

import './PreorderView.scss';

const _tagFilter = (tag) => {
    return (item) => {
        return item.tags.some((item) => { return item === tag; });
    };
};

export default class RootView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'all',
            maxImageWidth: 400,
            all: Media,
            g10: Media.filter(_tagFilter('g10')),
            naturals: Media.filter(_tagFilter('naturals')),
            synthetics: Media.filter(_tagFilter('synthetics')),
            micarta: Media.filter(_tagFilter('micarta')),
            wood: Media.filter(_tagFilter('wood')),
        };
    }

    zoom(zoomIn) {
        const {
            maxImageWidth,
        } = this.state;

        let newValue = maxImageWidth;

        if (zoomIn) {
            newValue = maxImageWidth + 50;
        } else {
            newValue = maxImageWidth - 50;
            if (newValue < 200) {
                newValue = 200;
            }
        }

        this.setState({ maxImageWidth: newValue });
    }

    renderToolbar() {
        const {
            selected,
        } = this.state;

        const button = (type, text) => {
            return (
                <Button
                    variant={selected === type ? 'primary' : 'secondary'}
                    onClick={() => this.setState({ selected: type })}
                >
                { text }
                </Button>
            );
        };

        return (
            <div className="toolbar">
                <div className="toolbar-group">
                    <ButtonGroup>
                        { button('all', 'All') }
                        { button('g10', 'G-10') }
                        { button('micarta', 'Micarta') }
                        { button('wood', 'Wood') }
                        { button('naturals', 'Naturals') }
                        { button('synthetics', 'Synthetics') }
                    </ButtonGroup>
                </div>

                <div className="toolbar-group">
                    <Button
                        variant="primary"
                        onClick={() => this.zoom(true)}
                    >
                        Zoom In
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => this.zoom(false)}
                    >
                        Zoom Out
                    </Button>
                </div>
            </div>
        );
    }

    renderImages(images) {
        const {
            maxImageWidth,
        } = this.state;

        const styles = { 'max-width': maxImageWidth };

        return images.map((image) => {
            return (
                <div className="image-container" style={styles}>
                    <ModalImage
                        alt={image.name}
                        small={`images/${image}`}
                        large={`images/${image}`}
                        hideDownload={true}
                        hideZoom={true}
                    />
                </div>
            );
        });
    }

    renderMedia() {
        const {
            selected,
        } = this.state;

        const media = this.state[selected];

        return (
            <div className="media">
                {
                    media.map((item) => {
                        return (
                            <div className="media-row">
                                <div className="title">
                                    { item.name }
                                </div>
                                <div className="gallery">
                                    { this.renderImages(item.images) }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className="view preorder-view">
                { this.renderToolbar() }
                { this.renderMedia() }
            </div>
        );
    }
}
