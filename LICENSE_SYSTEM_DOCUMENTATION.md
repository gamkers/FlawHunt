# Flaw Hunt License Key Management System

## Overview

The Flaw Hunt License Key Management System provides a comprehensive solution for managing software licenses with different subscription tiers, MAC address validation, and time-based expiration. This system is designed to control access to the Flaw Hunt CLI security scanning tool.

## Features

### 🔑 License Key Management
- **Unique License Generation**: Each license key follows the format `FH-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`
- **MAC Address Binding**: One license per MAC address to prevent unauthorized sharing
- **Time-based Expiration**: All licenses are valid for 1 month from creation
- **Status Tracking**: Active, expired, and revoked license states

### 📊 Subscription Plans

#### Basic Plan (Default)
- **License Limit**: 10 license keys
- **Cost**: Free
- **Features**: Standard security scanning
- **Validity**: 1 month per license

#### Premium Plan
- **License Limit**: 5 license keys
- **Cost**: $29.99 (Demo pricing)
- **Features**: 
  - Advanced security features
  - Priority support
  - Extended license validity
  - Enhanced reporting

### 💳 Payment System
- **Demo Payment Portal**: Simulated payment processing for testing
- **Secure Forms**: Credit card input with validation
- **Instant Upgrades**: Immediate plan activation after payment

## Technical Architecture

### Database Schema

#### Tables

1. **user_plans**
   - `id`: UUID primary key
   - `user_id`: Reference to auth.users
   - `plan_type`: 'basic' or 'premium'
   - `created_at`, `updated_at`, `expires_at`: Timestamps
   - `is_active`: Boolean status

2. **license_keys**
   - `id`: UUID primary key
   - `user_id`: Reference to auth.users
   - `license_key`: Unique license string
   - `plan_type`: Plan type for this license
   - `mac_address`: Device MAC address (17 chars)
   - `device_name`: Optional device identifier
   - `status`: 'active', 'expired', or 'revoked'
   - `created_at`, `expires_at`, `last_used_at`: Timestamps
   - `usage_count`: Number of times used

3. **payment_records**
   - `id`: UUID primary key
   - `user_id`: Reference to auth.users
   - `amount`: Payment amount
   - `currency`: Payment currency (default: USD)
   - `payment_status`: 'pending', 'completed', 'failed', 'refunded'
   - `transaction_id`: External transaction reference
   - `plan_type`: Plan being purchased

#### Security Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Indexes**: Optimized queries for user_id, MAC address, and expiration
- **Triggers**: Automatic timestamp updates
- **Constraints**: Data validation at database level

### Frontend Components

#### LicenseKeyManager
- **Location**: `src/components/LicenseKeyManager.tsx`
- **Features**:
  - Plan status display
  - License key generation
  - License table with filtering
  - Copy to clipboard functionality
  - Revoke license capability

#### PaymentModal
- **Location**: `src/components/PaymentModal.tsx`
- **Features**:
  - Credit card form with validation
  - Real-time input formatting
  - Demo payment processing
  - Security notices

### State Management

#### License Store (Zustand)
- **Location**: `src/store/licenseStore.ts`
- **State**:
  - `licenses`: Array of user license keys
  - `userPlan`: Current subscription plan
  - `loading`: Loading states
  - `error`: Error messages

- **Actions**:
  - `generateLicenseKey()`: Create new license
  - `revokeLicenseKey()`: Deactivate license
  - `validateLicenseKey()`: Check license validity
  - `upgradeToPremium()`: Process plan upgrade
  - `fetchUserLicenses()`: Load user data

### API Integration

#### Supabase Functions

1. **generate_license_key()**
   - Generates unique license keys
   - Format: `FH-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`
   - Uses MD5 hash with timestamp for uniqueness

2. **validate_license_key()**
   - Validates license against MAC address
   - Updates usage statistics
   - Returns validation result with plan details

3. **expire_old_licenses()**
   - Automatically expires licenses past their validity
   - Can be run as a scheduled job

## Implementation Details

### File Structure
```
src/
├── components/
│   ├── LicenseKeyManager.tsx    # Main license management UI
│   └── PaymentModal.tsx         # Payment processing modal
├── store/
│   └── licenseStore.ts          # License state management
├── types/
│   └── license.ts               # TypeScript interfaces
├── pages/
│   └── DashboardPage.tsx        # Updated with license manager
└── database/
    └── schema.sql               # Database schema and functions
```

### Key Features Implementation

#### License Key Generation
```typescript
// Format: FH-XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
const generateLicenseKey = () => {
  const keyBody = md5(random() + timestamp()).substring(0, 24);
  return `FH-${keyBody.match(/.{4}/g).join('-')}`;
};
```

#### MAC Address Validation
```sql
-- One license per MAC address per user
UNIQUE(mac_address, user_id)
```

#### Plan Limits Enforcement
```typescript
const PLAN_LIMITS = {
  basic: { max_licenses: 10, price: 0 },
  premium: { max_licenses: 5, price: 29.99 }
};
```

## Usage Guide

### For Users

1. **Sign Up/Login**: Access the dashboard through authentication
2. **View Plan Status**: See current plan and license limits
3. **Generate License**: Click "Generate New License Key"
4. **Copy License**: Use the copy button to get license key
5. **Upgrade Plan**: Click "Upgrade to Premium" for more features
6. **Manage Licenses**: View, copy, or revoke existing licenses

### For Developers

1. **Database Setup**: Run the schema.sql file in Supabase
2. **Environment Variables**: Configure Supabase credentials
3. **Component Integration**: Import LicenseKeyManager in dashboard
4. **State Management**: Use useLicenseStore hook for data
5. **Customization**: Modify plan limits and pricing as needed

## Security Considerations

### Data Protection
- **RLS Policies**: Database-level access control
- **Input Validation**: Client and server-side validation
- **MAC Address Binding**: Prevents license sharing
- **Secure Storage**: Encrypted database storage

### Payment Security
- **Demo Mode**: No real payment processing
- **Input Sanitization**: Secure form handling
- **HTTPS Only**: Secure data transmission
- **PCI Compliance**: Ready for real payment integration

## Testing

### Manual Testing
1. **License Generation**: Create licenses up to plan limit
2. **Plan Upgrade**: Test payment modal and plan change
3. **MAC Validation**: Verify one license per device
4. **Expiration**: Test license expiry after 1 month
5. **Revocation**: Test license deactivation

### Automated Testing
- Unit tests for license generation logic
- Integration tests for database operations
- E2E tests for user workflows
- Payment flow testing (demo mode)

## Future Enhancements

### Planned Features
- **Real Payment Integration**: Stripe/PayPal integration
- **License Analytics**: Usage statistics and reporting
- **Bulk Operations**: Generate/revoke multiple licenses
- **API Access**: REST API for license validation
- **Mobile App**: License management on mobile devices

### Scalability
- **Caching**: Redis for license validation
- **CDN**: Global license key distribution
- **Load Balancing**: Handle high validation volumes
- **Monitoring**: License usage analytics

## Support

### Common Issues
1. **License Not Working**: Check MAC address binding
2. **Payment Failed**: Verify demo mode is active
3. **Plan Not Updated**: Check payment processing status
4. **License Expired**: Generate new license key

### Contact
- **Technical Support**: Available through dashboard
- **Documentation**: This file and inline comments
- **Updates**: Check GitHub releases for updates

## Changelog

### Version 1.0.0 (Current)
- Initial license key management system
- Basic and Premium plan support
- MAC address validation
- Demo payment portal
- Database schema with RLS
- React components and state management

---

*This documentation is maintained alongside the codebase. Please update when making changes to the license system.*