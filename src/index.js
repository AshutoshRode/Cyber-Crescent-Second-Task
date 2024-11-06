import { registerBlockType } from '@wordpress/blocks';

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import './index.scss';

const colors = [
    { name: 'Red', color: '#FF474C' },

    { name: 'Green', color: '#90EE90' },
    { name: 'purple', color: '#B19CD9' },
    { name: 'Black', color: '#000' },
    { name: 'Gray', color: '#D3D3D3' },
];

registerBlockType('ashutosh-task/data-block', {
    title: 'Ashutosh Rode (Task-Display Data from API)',

    icon: 'database',
    category: 'widgets',

    attributes: {
        tableBodyColor: { type: 'string', default: '#ade48e' },
        textColor: { type: 'string', default: '#000' },
        borderColor: { type: 'string', default: '#000' },
        // tableTitlesBgColor: { type: 'string' }, default: '#ade48e'
    
        
    },
    edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__('Table Styles', 'ashutosh-task')}>
                        <p>
                            {__('Table Body Color:', 'ashutosh-task')}
                            </p>
                        <ColorPalette
                            colors={colors}

                            value={attributes.tableBodyColor}
                            onChange={(color) => setAttributes({ tableBodyColor: color })}
                        />

{/* 
                        <p>
                            {__('tableTitlesBgColor:', 'ashutosh-task')}
                        </p>
                        <ColorPalette
                            colors={colors}

                            value={attributes.tableTitlesBgColor}
                            onChange={(color) => setAttributes({ tableTitlesBgColor: color })}
                        /> */}

                        
                        <p>

                            {__('Text Color:', 'ashutosh-task')}
                            </p>
                        <ColorPalette
                            colors={colors}
                            value={attributes.textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                        <p>
                            {__('Border Color:', 'ashutosh-task')}
                            </p>
                        <ColorPalette
                            colors={colors}

                            value={attributes.borderColor}
                            onChange={(color) => setAttributes({ borderColor: color })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className='admin-page'>
                    <p>
                        Data from API will display here in the frontend.
                        </p>
                </div>
            </div>
        );
    },
    save() {
        return null;
    }
});