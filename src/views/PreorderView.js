import React from 'react';
import { Media } from './media';
import { Button, ButtonGroup } from 'react-bootstrap';
import ModalImage from 'react-modal-image';

import './PreorderView.scss';

const imageWidthMinimum = 200;
const imageWidthMaximum = 400;
const imagePath = process.env.PUBLIC_URL + '/assets/images';

const _tagFilter = (tag) => {
    return (item) => {
        return item.tags.some((item) => { return item === tag; });
    };
};

export default class RootView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedPrimary: 'all',
            selectedSecondary: 'all',
            maxImageWidth: imageWidthMaximum,
            all: Media,
            g10: Media.filter(_tagFilter('g10')),
            naturals: Media.filter(_tagFilter('naturals')),
            synthetics: Media.filter(_tagFilter('synthetics')),
            micarta: Media.filter(_tagFilter('micarta')),
            wood: Media.filter(_tagFilter('wood')),
            pinecone: Media.filter(_tagFilter('pinecone')),
            dragonscale: Media.filter(_tagFilter('dragonscale')),
            lizardskin: Media.filter(_tagFilter('lizardskin')),
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
        }

        this.setState({ maxImageWidth: newValue });
    }

    renderToolbar() {
        const {
            maxImageWidth,
            selectedPrimary,
            selectedSecondary,
        } = this.state;

        const primaryButton = (type, text) => {
            return (
                <Button
                    variant={selectedPrimary === type ? 'primary' : 'secondary'}
                    onClick={() => this.setState({ selectedPrimary: type })}
                >
                { text }
                </Button>
            );
        };

        const secondaryButton = (type, text) => {
            return (
                <Button
                    variant={selectedSecondary === type ? 'primary' : 'secondary'}
                    onClick={() => this.setState({ selectedSecondary: type })}
                >
                { text }
                </Button>
            );
        };

        return (
            <div className="toolbar">
                <ButtonGroup>
                    { primaryButton('all', 'All') }
                    { primaryButton('wood', 'Wood') }
                    { primaryButton('naturals', 'Naturals') }
                    { primaryButton('synthetics', 'Synthetics') }
                </ButtonGroup>

                { selectedPrimary === 'synthetics' && (
                    <ButtonGroup>
                        { secondaryButton('all', 'All') }
                        { secondaryButton('g10', 'G-10') }
                        { secondaryButton('micarta', 'Micarta') }
                        { secondaryButton('dragonscale', 'Dragon Scale') }
                        { secondaryButton('lizardskin', 'Lizard Skin') }
                    </ButtonGroup>
                )}

                { selectedPrimary === 'naturals' && (
                    <ButtonGroup>
                        { secondaryButton('all', 'All') }
                        { secondaryButton('pinecone', 'Pinecone') }
                    </ButtonGroup>
                )}

                <ButtonGroup>
                    <Button
                        variant="link"
                        onClick={() => this.zoom(true)}
                        disabled={maxImageWidth >= imageWidthMaximum}
                    >
                        Zoom +
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => this.zoom(false)}
                        disabled={maxImageWidth <= imageWidthMinimum}
                    >
                        Zoom -
                    </Button>
                </ButtonGroup>
            </div>
        );
    }

    renderImages(images) {
        const {
            maxImageWidth,
        } = this.state;

        const styles = { maxWidth: maxImageWidth };

        return images.map((image, idx) => {
            return (
                <div key={`image-${idx}`} className="image-container" style={styles}>
                    <ModalImage
                        alt={image.name}
                        small={`${imagePath}/${image.small}`}
                        large={`${imagePath}/${image.large}`}
                        hideDownload={true}
                        hideZoom={true}
                    />
                </div>
            );
        });
    }

    renderMedia() {
        const {
            selectedPrimary,
            selectedSecondary,
        } = this.state;

        let media = null;

        switch (selectedPrimary) {
            case 'all':
            case 'wood':
                media = this.state[selectedPrimary];
                break;
            case 'naturals':
            case 'synthetics':
                if (selectedSecondary === 'all') {
                    media = this.state[selectedPrimary];
                } else {
                    media = this.state[selectedSecondary];
                }
                break;
            default:
                break;
        }

        return (
            <div className="media">
                {
                    media.map((item, idx) => {
                        return (
                            <div key={`row-${idx}`} className="media-row">
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
