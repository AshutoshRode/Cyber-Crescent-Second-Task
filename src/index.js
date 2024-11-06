import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import './index.scss';

registerBlockType('ashutosh-task/data-block', {
    title: 'Ashutosh Rode (Task-Display Data from API)',
    icon: 'database',
    category: 'widgets',
    edit: function Edit() {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps} className='admin-page'>
                <p>Data from API will display here in frontend.</p>

            </div>
        );
    },
    save() {
        return null;
    }
});
