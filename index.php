<?php
/*
  Plugin Name: Ashutosh Rode
  Description: ashutosh rode task-2 in cyber crescent 
  Version: 1.0
  Author: Ashutosh
*/


if (!defined('ABSPATH')) exit;

class AshuTaskPlugin
{
    function __construct()
    {
        add_action('init', array($this, 'registerAssets'));
        add_action('rest_api_init', array($this, 'registerAPI'));

        add_action('admin_menu', array($this, 'addAdminPage'));
        add_action('wp_enqueue_scripts', array($this, 'frontendAssets'));
    }

    function registerAssets()
    {
        wp_register_script('customBlockScript', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'), '1.0', true);
       
        wp_register_style('customBlockStyles', plugin_dir_url(__FILE__) . 'build/index.css');
        register_block_type('ashutosh-task/data-block', array(
            'editor_script' => 'customBlockScript',

            'editor_style' => 'customBlockStyles',
            'render_callback' => array($this, 'renderBlock'),
            'attributes' => array(
                'tableBodyColor' => array('type' => 'string', 'default' => '#ade48e'),

                'textColor' => array('type' => 'string', 'default' => '#000000'),
                'borderColor' => array('type' => 'string', 'default' => '#000000'),
                // 'tableTitlesBgColor' => array('type' =>'string','default' =>'#ade48e')
            ),
        ));
    }

    function registerAPI()
    {
        register_rest_route('ashutosh-task/v1', '/fetch-data', array(
            'methods' => 'GET',

            'callback' => array($this, 'fetchDataFromRemoteAPI')
        ));
    }

    function fetchDataFromRemoteAPI()
    {
        $response = wp_remote_get('https://miusage.com/v1/challenge/1/');
        if (is_wp_error($response)) {
            return new WP_Error('api_error', 'Failed to fetch data', array('status' => 500));
        }
        $data = json_decode(wp_remote_retrieve_body($response), true);
       
        return $data;
    }

    function addAdminPage()
    {
        add_menu_page('API Data', 'API Data', 'manage_options', 'api-data', array($this, 'renderAdminPage'), 'dashicons-list-view');
    }

    function renderAdminPage()
    {
        echo '<div id="admin-data-page">
        </div>';
    }

    function frontendAssets()
    {
        wp_enqueue_script('customFrontendScript', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'), '1.0', true);
       
        wp_enqueue_style('customFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
    }

    function renderBlock($attributes)
    {
        $style = sprintf(
            'border-color: %s; color: %s; background-color: %s;
        ',
            esc_attr($attributes['borderColor']),

            esc_attr($attributes['textColor']),

            esc_attr($attributes['tableBodyColor']),
            
            // esc_attr($attributes['tableTitlesBgColor'] )

        );

        ob_start(); ?>
        <div class="ashutosh-task-block" style="<?php echo $style; ?>">
            <pre style="display: none;">
                <?php echo wp_json_encode($attributes) ?>
        </pre>
        </div>

<?php return ob_get_clean();
    }
}

$ashuTaskPlugin = new AshuTaskPlugin();
