<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Idea Hub | Staff App Master</title>
    <!-- External Fonts and Icons (Require Internet) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* --- DESIGN TOKENS --- */
        :root {
            --primary-dark: #1f2937; 
            --primary-gold: #dcb34e; 
            --gold-light: #fef08a;
            --bg-color: #f8fafc;     
            --card-white: #ffffff;
            --text-main: #374151;
            --text-sub: #6b7280;
            --border-color: #e5e7eb;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --action-blue: #3b82f6;
            --purple: #8b5cf6;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }

        body { background-color: #e2e8f0; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }

        /* Mobile Wrapper */
        .app-container { width: 100%; max-width: 414px; background-color: var(--bg-color); height: 100vh; position: relative; display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.15); overflow: hidden; }

        /* Views */
        .view { display: none; flex: 1; flex-direction: column; overflow-y: auto; padding-bottom: 90px; scrollbar-width: none; }
        .view::-webkit-scrollbar { display: none; }
        .view.active { display: flex; }
        .content { padding: 20px; }

        button { cursor: pointer; transition: 0.15s ease-in-out; border: none; outline: none; font-family: 'Poppins', sans-serif; }
        button:active { transform: scale(0.96); }

        /* Global Inputs */
        .input-group { margin-bottom: 15px; }
        .input-group label { display: block; font-size: 13px; color: var(--text-main); margin-bottom: 6px; font-weight: 500; }
        .standard-input { width: 100%; padding: 12px 15px; border: 1.5px solid var(--border-color); border-radius: 10px; font-size: 14px; outline: none; transition: 0.3s; color: var(--text-main); background: white; }
        .standard-input:focus { border-color: var(--primary-gold); }

        /* --- 1. LOGIN --- */
        #login-view { justify-content: center; align-items: center; padding: 20px; background: white; }
        .login-box { width: 100%; padding: 30px; border-radius: 20px; }
        .login-header { text-align: center; margin-bottom: 30px; }
        .login-header h2 { color: var(--text-main); font-size: 20px; margin-bottom: 5px; }
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .eye-icon { position: absolute; right: 15px; cursor: pointer; color: var(--text-sub); font-size: 16px;}
        .login-btn { width: 100%; padding: 14px; background: var(--primary-gold); color: white; border-radius: 10px; font-size: 16px; font-weight: 600; margin-top: 10px; }

        /* --- HEADER --- */
        .header { background: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); position: sticky; top: 0; z-index: 10; }
        .header-brand { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--primary-dark); font-size: 18px; }
        .header-brand .logo-box { width: 35px; height: 35px; background: var(--gold-light); border: 1px solid #ca8a04; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #ca8a04; }
        .header-icons { display: flex; gap: 15px; font-size: 22px; color: var(--text-main); cursor: pointer; align-items: center; }
        .cart-icon-wrapper { position: relative; }
        .cart-badge { position: absolute; top: -6px; right: -8px; background: var(--primary-gold); color: white; font-size: 10px; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold; opacity: 0; transition: 0.2s;}
        .icon-btn { width: 40px; height: 40px; border: 1px solid var(--border-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; background: white;}

        /* --- DASHBOARD --- */
        .top-bar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .page-title { font-size: 22px; font-weight: 700; color: var(--primary-dark); margin-bottom: 5px; }
        .page-subtitle { font-size: 13px; color: var(--text-sub); margin-bottom: 15px; }
        .search-bar { width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 10px; margin-bottom: 15px; background: white; font-size: 14px; }
        .filter-dropdown { padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; background: white; font-size: 13px; color: var(--text-main); outline: none; font-weight: 500; cursor: pointer;}
        
        .avail-card { background: white; padding: 15px; border-radius: 12px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color); }
        .avail-info h4 { color: var(--text-main); font-size: 14px; font-weight: 600; }
        .avail-info p { color: var(--text-sub); font-size: 12px; margin-top: 2px; }
        .badge-green { background: #10b981; color: white; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; }
        .badge-gold { background: var(--primary-gold); color: white; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; }

        .session-card { background: white; padding: 15px; border-radius: 16px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid var(--border-color); }
        .session-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
        .session-name { font-weight: 700; font-size: 18px; color: var(--primary-dark); }
        .session-tags { font-size: 12px; color: var(--text-sub); }
        .badge-space { background: #6b7280; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;}

        .time-track { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-sub); margin-bottom: 15px; }
        .time-track strong { color: var(--text-main); font-size: 13px; display: block; margin-top: 3px;}
        
        .btn-group { display: flex; gap: 10px; }
        .btn-action-blue { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; text-align: center; background: var(--action-blue); color: white; }
        .btn-action-gold { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 14px; text-align: center; background: var(--primary-gold); color: white; }

        .fab-green { position: absolute; bottom: 85px; right: 20px; width: 56px; height: 56px; background: #22c55e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4); z-index: 100; border: none; }

        /* --- ADMIN PANEL & PROFILE --- */
        .admin-hero { background: var(--primary-dark); padding: 25px 20px; border-radius: 16px; color: white; margin-bottom: 20px; }
        .admin-hero h2 { font-size: 24px; font-weight: 700; margin-bottom: 5px; }
        .admin-hero p { font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
        .btn-add-staff { background: var(--primary-gold); color: white; padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 14px; border: none; display: inline-flex; align-items: center; gap: 8px;}
        .admin-stat-card { background: white; padding: 25px; border-radius: 16px; text-align: center; border: 1px solid var(--border-color); }
        .admin-stat-icon { width: 50px; height: 50px; background: #fef3c7; color: #d97706; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 10px; }

        .profile-avatar-large { width: 80px; height: 80px; background: var(--primary-gold); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 35px; margin: 0 auto 15px; }
        .profile-title { text-align: center; font-size: 22px; font-weight: 700; color: var(--primary-gold); }
        .profile-subtitle { text-align: center; font-size: 13px; color: var(--text-sub); margin-bottom: 30px; }
        .profile-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid var(--border-color); }
        .profile-field { margin-bottom: 15px; }
        .profile-field label { display: block; font-size: 13px; color: var(--text-sub); margin-bottom: 5px; }
        .profile-field .val { padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 15px; color: var(--text-main); font-weight: 500; background: #f9fafb; }

        /* --- ORDERS MENU --- */
        .toggle-container { background: #e5e7eb; padding: 4px; border-radius: 10px; display: flex; margin-bottom: 15px; }
        .toggle-btn { flex: 1; padding: 10px; text-align: center; font-weight: 600; border-radius: 8px; font-size: 13px; color: var(--text-sub); background: transparent; transition: 0.3s; }
        .toggle-btn.active { background: white; color: var(--primary-gold); box-shadow: 0 2px 5px rgba(0,0,0,0.05); }

        .orders-table { width: 100%; background: #fefce8; border-radius: 12px; border-collapse: collapse; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .orders-table th { background: #fef08a; padding: 12px; font-size: 12px; color: var(--primary-dark); text-align: left; font-weight: 600;}
        .orders-table td { padding: 15px 12px; font-size: 13px; color: var(--text-main); background: white; border-bottom: 1px solid var(--border-color); }
        
        .food-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .food-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid var(--border-color); display: flex; flex-direction: column; transition: 0.3s; }
        .food-img { height: 110px; background: #f1f5f9; display: flex; justify-content: center; align-items: center; font-size: 35px; color: #cbd5e1; }
        .food-info { padding: 12px; display: flex; flex-direction: column; gap: 6px; }
        .food-name { font-size: 14px; font-weight: 600; color: var(--primary-dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
        .food-price { font-size: 14px; font-weight: 700; color: var(--primary-gold); }
        .btn-add { background: var(--primary-gold); color: white; padding: 8px; border-radius: 8px; font-weight: 600; font-size: 13px; width: 100%; margin-top: 5px;}

        /* --- RECORDS VIEW --- */
        .records-controls { display: flex; gap: 10px; margin-bottom: 15px; }
        .records-controls input { flex: 1; padding: 12px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 13px; outline: none; background: white;}
        .btn-clear { width: 100%; padding: 12px; background: white; border: 1px solid var(--border-color); border-radius: 10px; font-size: 14px; font-weight: 500; color: var(--text-main); margin-bottom: 15px; }
        
        .record-summary { background: white; padding: 15px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 10px; display: flex; flex-direction: column; gap: 5px; }
        .record-summary.cash { border-bottom: 3px solid #10b981; }
        .record-summary.gcash { border-bottom: 3px solid #3b82f6; }
        .record-summary.total { border-bottom: 3px solid #6b7280; }
        .record-summary span { font-size: 12px; color: var(--text-sub); }
        .record-summary strong { font-size: 18px; color: var(--primary-dark); font-weight: 700; }

        .detailed-record { background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; border: 1px solid var(--border-color); }
        .detailed-record-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .detailed-record-header h4 { font-size: 16px; color: var(--primary-dark); }
        .badge-tag { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; color: white; background: #10b981; }
        .detailed-record-space { font-size: 13px; color: var(--text-sub); margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6; }
        .detailed-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--text-sub); margin-bottom: 8px; }
        .detailed-row strong { color: var(--primary-dark); font-weight: 600;}
        .detailed-total { text-align: right; font-size: 18px; font-weight: 700; color: var(--primary-gold); margin-top: 10px; padding-top: 10px; border-top: 1px solid #f3f4f6; }

        /* --- INVENTORY VIEW --- */
        .inv-header-title { font-size: 26px; font-weight: 700; color: var(--primary-dark); line-height: 1.2; margin-bottom: 25px; display: flex; align-items: center; gap: 8px;}
        .inv-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .inv-card { padding: 15px; border-radius: 14px; color: white; display: flex; flex-direction: column; justify-content: space-between; height: 130px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .inv-card.low { background: linear-gradient(135deg, #f43f5e, #ec4899); }
        .inv-card.warning { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
        .inv-card.total { background: linear-gradient(135deg, #38bdf8, #0ea5e9); }
        .inv-card-title { font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 5px; text-transform: uppercase; letter-spacing: 0.5px; opacity: 0.95; line-height: 1.3;}
        .inv-card-num { font-size: 44px; font-weight: 700; line-height: 1; margin-top: 5px; }
        
        .stock-detail-card { background: white; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.02); border: 1px solid var(--border-color); border-left: 5px solid #fcd34d; }
        .stock-detail-title { font-size: 18px; font-weight: 700; color: var(--primary-dark); margin-bottom: 8px;}
        
        .badge-warning { background: #fffbeb; color: #d97706; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 15px;}
        .badge-warning i { font-size: 10px; color: #f59e0b; }
        .badge-danger { background: #fef2f2; color: #dc2626; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 15px;}
        .badge-danger i { font-size: 10px; color: #dc2626; }
        
        .stock-progress-bg { width: 100%; height: 8px; border-radius: 4px; background: #f1f5f9; margin-bottom: 20px; overflow: hidden;}
        .stock-progress-fill { height: 100%; border-radius: 4px; }
        
        .stock-stats-grid { background: #f9fafb; border-radius: 12px; padding: 15px; display: flex; justify-content: space-around; text-align: center; margin-bottom: 20px; border: 1px solid #f3f4f6;}
        .stat-box-label { font-size: 11px; color: var(--text-sub); text-transform: uppercase; font-weight: 500; letter-spacing: 0.5px;}
        .stat-box-value { font-size: 20px; font-weight: 700; color: var(--primary-dark); margin-top: 5px;}
        .stat-box-unit { font-size: 14px; font-weight: 600; color: var(--primary-dark); margin-top: 8px;}

        .stock-actions { display: flex; flex-direction: column; gap: 10px; }
        .action-btn-wide { width: 100%; padding: 12px; border-radius: 8px; font-weight: 500; font-size: 14px; display: flex; justify-content: center; align-items: center; gap: 8px; transition: 0.2s;}
        .action-btn-wide.edit { background: #eff6ff; color: #3b82f6; }
        .action-btn-wide.logs { background: #f5f3ff; color: #8b5cf6; }
        .action-btn-wide.delete { background: #fef2f2; color: #ef4444; }

        /* --- SIDE MENU --- */
        .side-menu-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 300; display: none; opacity: 0; transition: opacity 0.3s; }
        .side-menu { position: absolute; top: 0; right: 0; width: 85%; height: 100%; background: white; z-index: 301; transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); overflow-y: auto; box-shadow: -5px 0 15px rgba(0,0,0,0.1); }
        .side-menu-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; }
        .side-menu-header h2 { font-size: 22px; color: var(--primary-dark); font-weight: 700; }
        
        .menu-section-title { font-size: 11px; font-weight: 600; color: #9ca3af; text-transform: uppercase; margin: 25px 20px 10px; letter-spacing: 0.5px;}
        .menu-list-item { display: flex; align-items: center; padding: 14px 20px; font-size: 15px; font-weight: 600; color: var(--text-main); cursor: pointer; background: transparent; width: 90%; margin: 0 auto 5px; border-radius: 10px; transition: 0.2s;}
        .menu-list-item i { width: 30px; font-size: 18px; color: var(--text-sub); }
        .menu-list-item.active-gold { background: var(--gold-light); color: #b45309; }
        .menu-list-item.active-gold i { color: #b45309; }

        /* --- BOTTOM NAV --- */
        .bottom-nav { position: absolute; bottom: 0; width: 100%; background: white; display: flex; justify-content: space-around; padding: 12px 0 20px 0; border-top: 1px solid var(--border-color); z-index: 10; }
        .nav-item { display: flex; flex-direction: column; align-items: center; color: var(--text-sub); font-size: 11px; font-weight: 500; cursor: pointer; width: 25%; gap: 4px; transition: 0.2s; }
        .nav-item i { font-size: 20px; transition: 0.2s; }
        .nav-item.active { color: var(--primary-gold); }

        /* --- MODALS --- */
        .modal-overlay { display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 400; justify-content: center; align-items: center; padding: 20px; }
        .modal-box { background: white; width: 100%; border-radius: 16px; padding: 20px; animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); max-height: 90vh; overflow-y: auto;}
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .modal-header h3 { font-size: 18px; color: var(--primary-dark); }
        .payment-methods { display: flex; gap: 10px; margin-bottom: 15px; }
        .pay-btn { flex: 1; padding: 12px; border: 1.5px solid var(--border-color); border-radius: 8px; background: white; font-weight: 600; color: var(--text-sub); display: flex; align-items: center; justify-content: center; gap: 8px; }
        .pay-btn.active { border-color: var(--primary-gold); background: #fffdf5; color: var(--primary-gold); }
        
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .btn-cancel { padding: 12px 20px; background: #6b7280; color: white; border-radius: 8px; font-weight: 600; font-size: 14px; }
        .btn-confirm-blue { padding: 12px 20px; background: var(--action-blue); color: white; border-radius: 8px; font-weight: 600; font-size: 14px; }

        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        /* Inventory Modals (Purple) */
        .modal-box.purple-modal { padding: 0; overflow: hidden;}
        .modal-header-purple { background: linear-gradient(135deg, #7c3aed, #8b5cf6); color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
        .modal-header-purple h3 { font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
        .modal-body { padding: 20px; }
        .btn-confirm-purple { flex: 2; padding: 12px; background: linear-gradient(135deg, #7c3aed, #8b5cf6); color: white; border-radius: 8px; font-weight: 600; font-size: 15px; border: none;}
        .btn-cancel-grey { flex: 1; padding: 12px; background: #6b7280; color: white; border-radius: 8px; font-weight: 600; font-size: 15px; border: none;}
        .logs-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .logs-table th { font-size: 12px; color: #9ca3af; text-align: left; padding-bottom: 10px; border-bottom: 1px solid var(--border-color); }
        .logs-table td { font-size: 13px; color: var(--text-main); padding: 12px 0; border-bottom: 1px solid #f1f5f9; }

        /* --- TOAST NOTIFICATIONS --- */
        #toast-container { position: absolute; bottom: 90px; left: 50%; transform: translateX(-50%); z-index: 500; display: flex; flex-direction: column; gap: 10px; align-items: center; pointer-events: none; width: 90%;}
        .toast { background: #374151; color: white; padding: 12px 20px; border-radius: 30px; font-size: 13px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); animation: toastFade 3s forwards; display: flex; align-items: center; gap: 8px;}
        .toast.success i { color: var(--success); }
        .toast.error i { color: var(--danger); }
        @keyframes toastFade { 0% { opacity: 0; transform: translateY(20px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }

    </style>
</head>
<body>

<div class="app-container">
    
    <div id="toast-container"></div>

    <!-- 1. LOGIN -->
    <div id="login-view" class="view active">
        <div class="login-box">
            <div class="login-header">
                <h2>Idea Hub Coworking Space + Cafe</h2>
            </div>
            <div class="input-group">
                <label>Username</label>
                <input type="text" class="standard-input" value="staff1">
            </div>
            <div class="input-group">
                <label>Password</label>
                <div class="input-wrapper">
                    <input type="password" id="passInput" class="standard-input" value="Admin123!@#$">
                    <i class="fa-solid fa-eye-slash eye-icon" id="togglePass" onclick="togglePassword()"></i>
                </div>
            </div>
            <button class="login-btn" onclick="login()">Login</button>
        </div>
    </div>

    <!-- MAIN APP -->
    <div id="main-app" style="display: none; flex-direction: column; height: 100%;">
        
        <div class="header">
            <div class="header-brand">
                <div class="logo-box"><i class="fa-regular fa-lightbulb"></i></div>
                Idea Hub
            </div>
            <div class="header-icons">
                <div class="cart-icon-wrapper" onclick="openCart()">
                    <i class="fa-solid fa-shopping-bag"></i>
                    <div class="cart-badge" id="cart-badge">0</div>
                </div>
                <div class="icon-btn" onclick="toggleSideMenu()">
                    <i class="fa-solid fa-bars" style="font-size: 18px;"></i>
                </div>
            </div>
        </div>

        <!-- 2. ADMIN PANEL -->
        <div id="admin-view" class="view">
            <div class="content">
                <div class="admin-hero">
                    <h2>Admin Panel</h2>
                    <p>Manage staff accounts, analytics & operations</p>
                    <button class="btn-add-staff" onclick="showToast('Add Staff feature coming soon', 'info')">
                        <i class="fa-solid fa-user-plus"></i> Add Staff
                    </button>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon"><i class="fa-solid fa-user-group"></i></div>
                    <h1 style="font-size: 36px; color: var(--primary-dark);">19</h1>
                    <p style="font-size: 14px; color: var(--text-sub);">Total Customers</p>
                </div>
            </div>
        </div>

        <!-- 3. PROFILE VIEW -->
        <div id="profile-view" class="view">
            <div class="content">
                <div class="profile-avatar-large"><i class="fa-regular fa-user"></i></div>
                <div class="profile-title">My Profile</div>
                <div class="profile-subtitle">Account details</div>

                <div class="profile-card">
                    <div class="profile-field">
                        <label>Full Name</label>
                        <div class="val">Saver</div>
                    </div>
                    <div class="profile-field">
                        <label>Username</label>
                        <div class="val">staff1</div>
                    </div>
                    <div class="profile-field" style="margin-bottom: 0;">
                        <label>Role</label>
                        <div class="val">Staff</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 4. DASHBOARD VIEW -->
        <div id="dashboard-view" class="view">
            <div class="content">
                <h2 class="page-title">Active Customer Sessions</h2>
                <p class="page-subtitle">2 customer(s)</p>
                
                <input type="text" class="search-bar" placeholder="Search customer...">
                
                <div class="avail-card">
                    <div class="avail-info"><h4>Regular Lounge Seats</h4><p>1/20 occupied</p></div>
                    <span class="badge-green">19 left</span>
                </div>
                <div class="avail-card">
                    <div class="avail-info"><h4>Premium Lounge Seats</h4><p>1/30 occupied</p></div>
                    <span class="badge-gold">29 left</span>
                </div>

                <div class="session-card" id="customer-kurt">
                    <div class="session-header">
                        <div>
                            <div class="session-name">kurty</div>
                            <div class="session-tags">ui • it</div>
                        </div>
                        <span class="badge-space">Regular Lounge</span>
                    </div>
                    <div class="time-track">
                        <div>Time in <br><strong>May 22, 2026 03:07 PM</strong></div>
                        <div>Duration <br><strong>01:16:34</strong></div>
                        <div>Bill <br><strong style="color: var(--primary-dark);">₱12.76</strong></div>
                    </div>
                    <div class="btn-group">
                        <button class="btn-action-blue" onclick="navTo('orders')">Add Order</button>
                        <button class="btn-action-gold" onclick="openPayment('kurty', 'kurt', 12.76)">View Order</button>
                    </div>
                </div>
            </div>
            <button class="fab-green" onclick="openModal('checkin-modal')"><i class="fa-solid fa-plus"></i></button>
        </div>

        <!-- 5. ORDERS VIEW -->
        <div id="orders-view" class="view">
            <div class="content">
                <div class="toggle-container">
                    <button class="toggle-btn active" id="tab-btn-active" onclick="toggleOrderTabs('active')">Active Orders</button>
                    <button class="toggle-btn" id="tab-btn-menu" onclick="toggleOrderTabs('menu')">Browse Menu</button>
                </div>

                <div id="orders-active-tab">
                    <h2 class="page-title">Orders</h2>
                    <p class="page-subtitle">1 session(s)</p>
                    <table class="orders-table">
                        <tr><th>Customer</th><th>Space</th><th>Items</th><th>Status</th><th>Action</th></tr>
                        <tr><td style="font-weight: 500;">Mobile</td><td>Premium</td><td>1</td><td>preparing</td>
                            <td><button style="background: var(--action-blue); color: white; padding: 6px 10px; border-radius: 6px; font-weight: 600; font-size: 12px; border: none; cursor: pointer;">View</button></td>
                        </tr>
                    </table>
                </div>

                <div id="orders-menu-tab" style="display: none;">
                    <input type="text" class="search-bar" placeholder="Search menu items..." onkeyup="showToast('Search feature active', 'info')">
                    
                    <div class="food-grid">
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-mug-hot"></i></div><div class="food-info"><div class="food-name">Coffee</div><div class="food-price">₱40.00</div><button class="btn-add" onclick="addToCart('Coffee', 40)">+ Add</button></div></div>
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-wine-glass"></i></div><div class="food-info"><div class="food-name">Coke</div><div class="food-price">₱35.00</div><button class="btn-add" onclick="addToCart('Coke', 35)">+ Add</button></div></div>
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-mug-hot"></i></div><div class="food-info"><div class="food-name">Hot Latte</div><div class="food-price">₱80.00</div><button class="btn-add" onclick="addToCart('Hot Latte', 80)">+ Add</button></div></div>
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-bowl-food"></i></div><div class="food-info"><div class="food-name">Bangsilog</div><div class="food-price">₱120.00</div><button class="btn-add" onclick="addToCart('Bangsilog', 120)">+ Add</button></div></div>
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-bowl-food"></i></div><div class="food-info"><div class="food-name">Beef Caldereta</div><div class="food-price">₱125.00</div><button class="btn-add" onclick="addToCart('Beef Caldereta', 125)">+ Add</button></div></div>
                        <div class="food-card"><div class="food-img"><i class="fa-solid fa-bowl-food"></i></div><div class="food-info"><div class="food-name">Chicksilog</div><div class="food-price">₱105.00</div><button class="btn-add" onclick="addToCart('Chicksilog', 105)">+ Add</button></div></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 6. RECORDS VIEW -->
        <div id="records-view" class="view">
            <div class="content">
                <h2 class="page-title">Checkout Records</h2>
                <p class="page-subtitle">17 record(s)</p>
                
                <input type="text" class="search-bar" placeholder="Search customer...">
                <div class="records-controls">
                    <input type="date" placeholder="Start">
                    <input type="date" placeholder="End">
                </div>
                <select class="search-bar" style="margin-bottom: 10px;">
                    <option>All payments</option><option>Cash</option><option>GCash</option>
                </select>
                <button class="btn-clear" onclick="showToast('Filters cleared', 'info')">Clear</button>

                <div class="record-summary cash"><span>Cash</span><strong>₱6922.78 <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(12)</span></strong></div>
                <div class="record-summary gcash"><span>GCash</span><strong>₱9332.46 <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(5)</span></strong></div>
                <div class="record-summary total"><span>Grand Total</span><strong>₱16255.24 <span style="font-weight: normal; font-size: 14px; color: var(--text-sub);">(17)</span></strong></div>

                <h3 style="font-size: 16px; color: var(--text-sub); margin: 20px 0 15px;">May 2026</h3>
                
                <div id="transaction-list">
                    <div class="detailed-record">
                        <div class="detailed-record-header"><h4>carlsssadas</h4><span class="badge-tag">Cash</span></div>
                        <div class="detailed-record-space">Premium Lounge</div>
                        <div class="detailed-row"><span>Date:</span> <strong>May</strong></div>
                        <div class="detailed-row"><span>Duration:</span> <strong>00:15:42</strong></div>
                        <div class="detailed-row"><span>Time Bill:</span> <strong>₱5.24</strong></div>
                        <div class="detailed-row"><span>Food Bill:</span> <strong>₱325.00</strong></div>
                        <div class="detailed-total">₱330.24</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 7. INVENTORY VIEW (EXACT DESIGN IMPLEMENTATION) -->
        <div id="inventory-view" class="view">
            <div class="content">
                <div class="inv-header-title"><i class="fa-solid fa-box" style="color: #c28b57; font-size: 32px;"></i> Inventory<br>Management</div>
                
                <div class="inv-summary-grid">
                    <div class="inv-card low">
                        <div class="inv-card-title"><i class="fa-solid fa-circle" style="color: #ef4444;"></i> LOW STOCK ITEMS</div>
                        <div class="inv-card-num">1</div>
                    </div>
                    <div class="inv-card warning">
                        <div class="inv-card-title"><i class="fa-solid fa-circle" style="color: #fef08a;"></i> WARNING STOCK</div>
                        <div class="inv-card-num">8</div>
                    </div>
                    <div class="inv-card total">
                        <div class="inv-card-title"><i class="fa-solid fa-square-check" style="color: #86efac;"></i> TOTAL ITEMS</div>
                        <div class="inv-card-num">9</div>
                    </div>
                </div>

                <!-- Stock Item: Banana Cue -->
                <div class="stock-detail-card" id="inv-item-1">
                    <div class="stock-detail-title">Banana Cue</div>
                    <div class="badge-warning"><i class="fa-solid fa-circle"></i> Warning</div>
                    
                    <div class="stock-progress-bg"><div class="stock-progress-fill" style="width: 80%; background: linear-gradient(90deg, #f43f5e, #f59e0b, #fde047);"></div></div>
                    
                    <div class="stock-stats-grid">
                        <div><div class="stat-box-label">CURRENT STOCK</div><div class="stat-box-value" id="stock-val-1">50</div></div>
                        <div><div class="stat-box-label">UNIT</div><div class="stat-box-unit">pieces</div></div>
                        <div><div class="stat-box-label">THRESHOLD</div><div class="stat-box-value">10</div></div>
                    </div>

                    <div class="stock-actions">
                        <button class="action-btn-wide edit" onclick="openUpdateModal('inv-item-1', 'Banana Cue')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button class="action-btn-wide logs" onclick="openLogsModal()"><i class="fa-solid fa-chart-column"></i> Logs</button>
                        <button class="action-btn-wide delete" onclick="deleteStock('inv-item-1', 'Banana Cue')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>

                <!-- Stock Item: Beef Caldereta -->
                <div class="stock-detail-card" style="border-left-color: #fcd34d;" id="inv-item-2">
                    <div class="stock-detail-title">Beef Caldereta</div>
                    <div class="badge-warning"><i class="fa-solid fa-circle"></i> Warning</div>
                    
                    <div class="stock-progress-bg"><div class="stock-progress-fill" style="width: 50%; background: linear-gradient(90deg, #f43f5e, #f59e0b, #fde047);"></div></div>
                    
                    <div class="stock-stats-grid">
                        <div><div class="stat-box-label">CURRENT STOCK</div><div class="stat-box-value" id="stock-val-2">5</div></div>
                        <div><div class="stat-box-label">UNIT</div><div class="stat-box-unit">Kg</div></div>
                        <div><div class="stat-box-label">THRESHOLD</div><div class="stat-box-value">3</div></div>
                    </div>

                    <div class="stock-actions">
                        <button class="action-btn-wide edit" onclick="openUpdateModal('inv-item-2', 'Beef Caldereta')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button class="action-btn-wide logs" onclick="openLogsModal()"><i class="fa-solid fa-chart-column"></i> Logs</button>
                        <button class="action-btn-wide delete" onclick="deleteStock('inv-item-2', 'Beef Caldereta')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>

                <!-- Stock Item: chicken test -->
                <div class="stock-detail-card" style="border-left-color: #fcd34d;" id="inv-item-3">
                    <div class="stock-detail-title">chicken test</div>
                    <div class="badge-warning"><i class="fa-solid fa-circle"></i> Warning</div>
                    
                    <div class="stock-progress-bg"><div class="stock-progress-fill" style="width: 60%; background: linear-gradient(90deg, #f43f5e, #f59e0b, #fde047);"></div></div>
                    
                    <div class="stock-stats-grid">
                        <div><div class="stat-box-label">CURRENT STOCK</div><div class="stat-box-value" id="stock-val-3">10</div></div>
                        <div><div class="stat-box-label">UNIT</div><div class="stat-box-unit">kg</div></div>
                        <div><div class="stat-box-label">THRESHOLD</div><div class="stat-box-value">2</div></div>
                    </div>

                    <div class="stock-actions">
                        <button class="action-btn-wide edit" onclick="openUpdateModal('inv-item-3', 'chicken test')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button class="action-btn-wide logs" onclick="openLogsModal()"><i class="fa-solid fa-chart-column"></i> Logs</button>
                        <button class="action-btn-wide delete" onclick="deleteStock('inv-item-3', 'chicken test')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>

                <!-- Stock Item: Sprite (LOW STOCK) -->
                <div class="stock-detail-card" style="border-left-color: #f43f5e;" id="inv-item-4">
                    <div class="stock-detail-title">Sprite</div>
                    <div class="badge-danger"><i class="fa-solid fa-circle"></i> Low Stock</div>
                    
                    <div class="stock-progress-bg"><div class="stock-progress-fill" style="width: 20%; background: linear-gradient(90deg, #e11d48, #f43f5e);"></div></div>
                    
                    <div class="stock-stats-grid">
                        <div><div class="stat-box-label">CURRENT STOCK</div><div class="stat-box-value" id="stock-val-4">1</div></div>
                        <div><div class="stat-box-label">UNIT</div><div class="stat-box-unit">pieces</div></div>
                        <div><div class="stat-box-label">THRESHOLD</div><div class="stat-box-value">5</div></div>
                    </div>

                    <div class="stock-actions">
                        <button class="action-btn-wide edit" onclick="openUpdateModal('inv-item-4', 'Sprite')"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button class="action-btn-wide logs" onclick="openLogsModal()"><i class="fa-solid fa-chart-column"></i> Logs</button>
                        <button class="action-btn-wide delete" onclick="deleteStock('inv-item-4', 'Sprite')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                </div>

            </div>
        </div>

        <!-- BOTTOM NAVIGATION -->
        <div class="bottom-nav">
            <div class="nav-item" onclick="navTo('dashboard', 0)">
                <i class="fa-solid fa-border-all"></i><span>Dashboard</span>
            </div>
            <div class="nav-item" onclick="navTo('orders', 1)">
                <i class="fa-solid fa-bag-shopping"></i><span>Orders</span>
            </div>
            <div class="nav-item" onclick="navTo('records', 2)">
                <i class="fa-solid fa-receipt"></i><span>Records</span>
            </div>
            <div class="nav-item" onclick="toggleSideMenu()">
                <i class="fa-solid fa-ellipsis"></i><span>More</span>
            </div>
        </div>
    </div>

    <!-- SIDE MENU OVERLAY -->
    <div class="side-menu-overlay" id="side-overlay" onclick="toggleSideMenu()"></div>
    <div class="side-menu" id="side-menu">
        <div class="side-menu-header">
            <h2>Menu</h2>
            <i class="fa-solid fa-xmark" style="font-size: 24px; color: var(--text-sub); cursor: pointer;" onclick="toggleSideMenu()"></i>
        </div>
        <div style="padding-bottom: 30px;">
            
            <div class="menu-section-title">Navigation</div>
            <button class="menu-list-item" onclick="navTo('admin')"><i class="fa-solid fa-shield-halved"></i> Admin Panel</button>
            <button class="menu-list-item active-gold" id="menu-dash" onclick="navTo('dashboard')"><i class="fa-solid fa-border-all"></i> Dashboard</button>
            <button class="menu-list-item" onclick="navTo('records')"><i class="fa-solid fa-receipt"></i> Checkout Records</button>

            <div class="menu-section-title">Operations</div>
            <button class="menu-list-item" onclick="navTo('inventory')"><i class="fa-solid fa-cubes"></i> Inventory</button>

            <div class="menu-section-title">Account</div>
            <button class="menu-list-item" onclick="navTo('profile')"><i class="fa-regular fa-id-badge"></i> My Profile</button>
            <button class="menu-list-item danger" onclick="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>

        </div>
    </div>

    <!-- MODALS -->

    <!-- CHECK IN -->
    <div id="checkin-modal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <h3>New Customer Check-in</h3>
                <i class="fa-solid fa-times" onclick="closeModal('checkin-modal')" style="cursor: pointer; font-size: 20px; color: var(--text-sub);"></i>
            </div>
            <div class="input-group"><input type="text" id="ci-name" class="standard-input" placeholder="Customer Name"></div>
            <div class="input-group"><input type="text" class="standard-input" placeholder="School"></div>
            <div class="modal-actions">
                <button class="btn-cancel" onclick="closeModal('checkin-modal')">Cancel</button>
                <button class="btn-confirm-blue" onclick="processCheckin()">Check In</button>
            </div>
        </div>
    </div>

    <!-- CART -->
    <div id="cart-modal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <h3>Walk-in Order Cart</h3>
                <i class="fa-solid fa-times" onclick="closeModal('cart-modal')" style="cursor: pointer; font-size: 20px; color: var(--text-sub);"></i>
            </div>
            <div id="cart-items-container" style="max-height: 250px; overflow-y: auto;"></div>
            <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
                <strong style="color: var(--primary-dark);">Total:</strong>
                <strong style="color: var(--primary-gold); font-size: 18px;" id="cart-total-display">₱0.00</strong>
            </div>
            <button class="login-btn" id="btn-checkout-cart" style="background: var(--success); opacity: 0.5; pointer-events: none;" onclick="checkoutCart()">Proceed to Checkout</button>
        </div>
    </div>

    <!-- PAYMENT -->
    <div id="payment-modal" class="modal-overlay">
        <div class="modal-box">
            <div class="modal-header">
                <h3>Payment & Checkout</h3>
                <i class="fa-solid fa-times" onclick="closeModal('payment-modal')" style="cursor: pointer; font-size: 20px; color: var(--text-sub);"></i>
            </div>
            <div style="text-align: center; margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 12px;">
                <p style="font-size: 13px; color: var(--text-sub);">Total Due for <span id="pay-name" style="font-weight: bold;">User</span></p>
                <h1 style="color: var(--danger); font-size: 32px;" id="pay-total">₱0.00</h1>
            </div>
            <div class="input-group" style="margin-bottom: 20px;">
                <label>Amount Tendered (₱)</label>
                <input type="number" class="standard-input" id="pay-input" placeholder="Enter amount...">
            </div>
            <button class="login-btn" style="margin-top:0;" onclick="processPayment()">Confirm Payment</button>
        </div>
    </div>

    <!-- INVENTORY: UPDATE STOCK -->
    <div id="modal-update-stock" class="modal-overlay">
        <div class="modal-box purple-modal">
            <div class="modal-header-purple">
                <h3>Update Stock</h3>
                <i class="fa-solid fa-times" onclick="closeModal('modal-update-stock')" style="cursor: pointer; font-size: 20px;"></i>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <label>New Quantity</label>
                    <input type="number" id="update-qty-input" class="standard-input" placeholder="e.g. 50">
                </div>
                <div class="input-group">
                    <label>Reason</label>
                    <select class="standard-input"><option>Restock</option><option>Damaged</option><option>Used</option></select>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-cancel-grey" onclick="closeModal('modal-update-stock')">Cancel</button>
                    <button class="btn-confirm-purple" style="margin-top: 0;" onclick="confirmStockUpdate()">Update</button>
                </div>
            </div>
        </div>
    </div>

    <!-- INVENTORY: LOGS -->
    <div id="modal-logs" class="modal-overlay">
        <div class="modal-box purple-modal">
            <div class="modal-header-purple">
                <h3><i class="fa-solid fa-chart-simple"></i> Inventory Logs</h3>
                <i class="fa-solid fa-times" onclick="closeModal('modal-logs')" style="cursor: pointer; font-size: 20px;"></i>
            </div>
            <div class="modal-body" style="padding-top: 10px;">
                <table class="logs-table">
                    <tr><th>Date</th><th>Change</th><th>Reason</th><th>By</th></tr>
                    <tr><td style="color: var(--text-sub);">2026-05-22<br>07:10:18</td><td style="color: var(--success); font-weight: bold;">+12</td><td>Restock</td><td>admin</td></tr>
                </table>
            </div>
        </div>
    </div>

</div>

<script>
    /* --- TOAST NOTIFICATIONS --- */
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        let icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-circle-exclamation' : 'fa-info-circle');
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 3000);
    }

    /* --- MODALS --- */
    function openModal(id) { document.getElementById(id).style.display = 'flex'; }
    function closeModal(id) { document.getElementById(id).style.display = 'none'; }

    /* --- LOGIN LOGIC --- */
    function togglePassword() {
        const passInput = document.getElementById('passInput');
        const icon = document.getElementById('togglePass');
        if (passInput.type === "password") {
            passInput.type = "text";
            icon.classList.remove('fa-eye-slash'); icon.classList.add('fa-eye');
        } else {
            passInput.type = "password";
            icon.classList.remove('fa-eye'); icon.classList.add('fa-eye-slash');
        }
    }

    function login() {
        document.getElementById('login-view').classList.remove('active');
        document.getElementById('main-app').style.display = 'flex';
        navTo('dashboard', 0);
        showToast('Logged in successfully', 'success');
    }

    function logout() {
        toggleSideMenu();
        document.getElementById('main-app').style.display = 'none';
        document.getElementById('login-view').classList.add('active');
        showToast('Logged out securely', 'info');
    }

    /* --- NAVIGATION --- */
    function navTo(viewId, index = null) {
        const menu = document.getElementById('side-menu');
        if(menu && menu.style.transform === 'translateX(0px)') toggleSideMenu();

        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById(viewId + '-view').classList.add('active');
        
        document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
        if(index !== null && index < 3) {
            document.querySelectorAll('.bottom-nav .nav-item')[index].classList.add('active');
        }

        document.querySelectorAll('.menu-list-item').forEach(m => m.classList.remove('active-gold'));
        if(viewId === 'dashboard') document.getElementById('menu-dash').classList.add('active-gold');
    }

    function toggleSideMenu() {
        const overlay = document.getElementById('side-overlay');
        const menu = document.getElementById('side-menu');
        if (menu.style.transform === 'translateX(0px)') {
            menu.style.transform = 'translateX(100%)';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 300);
        } else {
            overlay.style.display = 'block';
            setTimeout(() => { overlay.style.opacity = '1'; menu.style.transform = 'translateX(0px)'; }, 10);
        }
    }

    function toggleOrderTabs(tab) {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('orders-active-tab').style.display = 'none';
        document.getElementById('orders-menu-tab').style.display = 'none';
        
        if(tab === 'active') {
            document.getElementById('tab-btn-active').classList.add('active');
            document.getElementById('orders-active-tab').style.display = 'block';
        } else {
            document.getElementById('tab-btn-menu').classList.add('active');
            document.getElementById('orders-menu-tab').style.display = 'block';
        }
    }

    /* --- CHECK IN LOGIC --- */
    function processCheckin() {
        const name = document.getElementById('ci-name').value || "New Customer";
        showToast(`${name} checked in to Regular Lounge`, 'success');
        document.getElementById('ci-name').value = '';
        closeModal('checkin-modal');
    }

    /* --- CART & PAYMENT LOGIC --- */
    let cart = []; let cartTotalAmount = 0;
    function addToCart(name, price) {
        cart.push({name, price}); cartTotalAmount += price;
        const badge = document.getElementById('cart-badge');
        badge.innerText = cart.length; badge.style.opacity = '1';
        showToast(`${name} added to cart!`);
    }

    function openCart() {
        const container = document.getElementById('cart-items-container');
        const btn = document.getElementById('btn-checkout-cart');
        container.innerHTML = ''; 
        if(cart.length === 0) {
            container.innerHTML = '<div style="text-align:center; padding:20px; font-size:14px; color:gray;">Your cart is empty.</div>';
            btn.style.opacity = '0.5'; btn.style.pointerEvents = 'none';
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement('div');
                div.style.cssText = "display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #e5e7eb;";
                div.innerHTML = `<div>${item.name} <br><span style="font-size:12px; color:gray;">₱${item.price.toFixed(2)}</span></div>
                                 <i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer;" onclick="removeFromCart(${index})"></i>`;
                container.appendChild(div);
            });
            btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
        }
        document.getElementById('cart-total-display').innerText = `₱${cartTotalAmount.toFixed(2)}`;
        openModal('cart-modal');
    }

    function removeFromCart(index) {
        cartTotalAmount -= cart[index].price; cart.splice(index, 1);
        const badge = document.getElementById('cart-badge');
        badge.innerText = cart.length; if(cart.length === 0) badge.style.opacity = '0';
        openCart(); 
    }

    function checkoutCart() { closeModal('cart-modal'); openPayment('Walk-in Order', 'cart', cartTotalAmount); }

    let currentBalance = 0; let activeCustomerId = '';
    function openPayment(name, customerId, balance) {
        currentBalance = balance; activeCustomerId = customerId;
        document.getElementById('pay-name').innerText = name;
        document.getElementById('pay-total').innerText = '₱' + balance.toFixed(2);
        document.getElementById('pay-input').value = '';
        openModal('payment-modal');
    }

    function processPayment() {
        const input = parseFloat(document.getElementById('pay-input').value) || 0;
        if(input <= 0) { showToast("Enter a valid amount.", "error"); return; }
        
        const timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let paymentAmount = input < currentBalance ? input : currentBalance;

        const newRecord = `
            <div class="detailed-record">
                <div class="detailed-record-header">
                    <h4>${document.getElementById('pay-name').innerText}</h4>
                    <span class="badge-tag">Cash</span>
                </div>
                <div class="detailed-record-space">Processed at ${timeString}</div>
                <div class="detailed-row"><span>Time Bill:</span> <strong>₱0.00</strong></div>
                <div class="detailed-row"><span>Food Bill:</span> <strong>₱${paymentAmount.toFixed(2)}</strong></div>
                <div class="detailed-total">₱${paymentAmount.toFixed(2)}</div>
            </div>`;
        
        document.getElementById('transaction-list').insertAdjacentHTML('afterbegin', newRecord);

        if(activeCustomerId === 'cart') {
            cart = []; cartTotalAmount = 0; document.getElementById('cart-badge').style.opacity = '0';
        }
        
        showToast(`Payment of ₱${input.toFixed(2)} processed successfully!`, "success");
        closeModal('payment-modal');
    }

    /* --- INVENTORY LOGIC --- */
    let currentEditItemId = null;
    function openUpdateModal(id, itemName) { 
        currentEditItemId = id; 
        document.getElementById('update-qty-input').value = ''; 
        openModal('modal-update-stock'); 
    }

    function confirmStockUpdate() {
        const newQty = document.getElementById('update-qty-input').value;
        if(!newQty) { showToast('Please enter a quantity', 'error'); return; }
        
        if(currentEditItemId) {
            const stockValueDisplay = document.querySelector(`#${currentEditItemId} .stat-box-value`);
            if(stockValueDisplay) stockValueDisplay.innerText = newQty;
        }
        
        closeModal('modal-update-stock');
        showToast('Inventory stock updated successfully!', 'success');
    }

    function openLogsModal() { openModal('modal-logs'); }

    function deleteStock(id, itemName) {
        if(confirm(`Are you sure you want to delete ${itemName} from inventory?`)) {
            const el = document.getElementById(id);
            if(el) {
                el.style.opacity = '0';
                setTimeout(() => { el.remove(); showToast(`${itemName} has been deleted.`, 'error'); }, 300);
            }
        }
    }
</script>

</body>
</html>
