#!/bin/bash
# Этот скрипт создаст структуру проекта внутри каталога sp-client


# Создаем директории в каталоге public
mkdir -p sp-client/public/assets/{images,fonts}

# Создаем структуру для Next.js App Router
mkdir -p sp-client/src/app/{auth,dashboard,profile,purchases,products,orders,social,messages,notifications,payments}
mkdir -p sp-client/src/app/purchases/[id]
mkdir -p sp-client/src/app/products/[id]
mkdir -p sp-client/src/app/orders/[id]
mkdir -p sp-client/src/app/social/{connections,groups}
mkdir -p sp-client/src/app/messages/[userId]

# Создаем директорию для компонентов
mkdir -p sp-client/src/components/{ui,layout,auth,dashboard,products,purchases,orders,social,messages,notifications,payments}

# Создаем директории для хуков, библиотек, типов, контекстов, стилей и конфигурации
mkdir -p sp-client/src/hooks
mkdir -p sp-client/src/lib/api
mkdir -p sp-client/src/lib/utils
mkdir -p sp-client/src/types
mkdir -p sp-client/src/context
mkdir -p sp-client/src/styles
mkdir -p sp-client/src/config

# Создаем файлы для страниц приложения
touch sp-client/src/app/auth/login/page.tsx
touch sp-client/src/app/auth/register/page.tsx
touch sp-client/src/app/auth/password-reset/page.tsx
touch sp-client/src/app/dashboard/page.tsx
touch sp-client/src/app/dashboard/loading.tsx
touch sp-client/src/app/profile/page.tsx
touch sp-client/src/app/profile/edit/page.tsx
touch sp-client/src/app/purchases/page.tsx
touch sp-client/src/app/purchases/[id]/page.tsx
touch sp-client/src/app/purchases/new/page.tsx
touch sp-client/src/app/products/page.tsx
touch sp-client/src/app/products/[id]/page.tsx
touch sp-client/src/app/orders/page.tsx
touch sp-client/src/app/orders/[id]/page.tsx
touch sp-client/src/app/social/page.tsx
touch sp-client/src/app/social/connections/page.tsx
touch sp-client/src/app/social/groups/page.tsx
touch sp-client/src/app/messages/page.tsx
touch sp-client/src/app/messages/[userId]/page.tsx
touch sp-client/src/app/notifications/page.tsx
touch sp-client/src/app/payments/page.tsx
touch sp-client/src/app/payments/checkout/page.tsx
touch sp-client/src/app/layout.tsx
touch sp-client/src/app/page.tsx

# Создаем файлы для UI-компонентов
touch sp-client/src/components/ui/Button.tsx
touch sp-client/src/components/ui/Input.tsx
touch sp-client/src/components/ui/Select.tsx
touch sp-client/src/components/ui/Card.tsx
touch sp-client/src/components/ui/Modal.tsx
touch sp-client/src/components/ui/Dropdown.tsx
touch sp-client/src/components/ui/Avatar.tsx
touch sp-client/src/components/ui/Badge.tsx
touch sp-client/src/components/ui/Alert.tsx
touch sp-client/src/components/ui/Spinner.tsx
touch sp-client/src/components/ui/Toggle.tsx
touch sp-client/src/components/ui/Table.tsx
touch sp-client/src/components/ui/Tabs.tsx
touch sp-client/src/components/ui/Tooltip.tsx
touch sp-client/src/components/ui/ThemeToggle.tsx

# Файлы для layout-компонентов
touch sp-client/src/components/layout/Header.tsx
touch sp-client/src/components/layout/Sidebar.tsx
touch sp-client/src/components/layout/Footer.tsx
touch sp-client/src/components/layout/Navigation.tsx
touch sp-client/src/components/layout/MobileMenu.tsx
touch sp-client/src/components/layout/UserMenu.tsx
touch sp-client/src/components/layout/NotificationCenter.tsx

# Файлы для компонентов аутентификации
touch sp-client/src/components/auth/LoginForm.tsx
touch sp-client/src/components/auth/RegisterForm.tsx
touch sp-client/src/components/auth/PasswordResetForm.tsx

# Файлы для компонентов дашборда
touch sp-client/src/components/dashboard/StatCard.tsx
touch sp-client/src/components/dashboard/ActivityFeed.tsx
touch sp-client/src/components/dashboard/RecentOrders.tsx

# Файлы для компонентов товаров
touch sp-client/src/components/products/ProductCard.tsx
touch sp-client/src/components/products/ProductGrid.tsx
touch sp-client/src/components/products/ProductFilter.tsx
touch sp-client/src/components/products/ProductSearch.tsx

# Файлы для компонентов закупок
touch sp-client/src/components/purchases/PurchaseCard.tsx
touch sp-client/src/components/purchases/PurchaseList.tsx
touch sp-client/src/components/purchases/PurchaseForm.tsx

# Файлы для компонентов заказов
touch sp-client/src/components/orders/OrderCard.tsx
touch sp-client/src/components/orders/OrderList.tsx
touch sp-client/src/components/orders/OrderTimeline.tsx

# Файлы для компонентов социальных функций
touch sp-client/src/components/social/FriendsList.tsx
touch sp-client/src/components/social/ConnectionRequest.tsx
touch sp-client/src/components/social/SocialFeed.tsx

# Файлы для компонентов сообщений
touch sp-client/src/components/messages/ChatWindow.tsx
touch sp-client/src/components/messages/MessageList.tsx
touch sp-client/src/components/messages/MessageInput.tsx
touch sp-client/src/components/messages/ConversationList.tsx

# Файлы для компонентов уведомлений
touch sp-client/src/components/notifications/NotificationItem.tsx
touch sp-client/src/components/notifications/NotificationList.tsx

# Файлы для компонентов платежей
touch sp-client/src/components/payments/PaymentCard.tsx
touch sp-client/src/components/payments/PaymentForm.tsx

# Файлы для хуков
touch sp-client/src/hooks/useAuth.ts
touch sp-client/src/hooks/useUser.ts
touch sp-client/src/hooks/useProducts.ts
touch sp-client/src/hooks/usePurchases.ts
touch sp-client/src/hooks/useOrders.ts
touch sp-client/src/hooks/useNotifications.ts
touch sp-client/src/hooks/useMessages.ts
touch sp-client/src/hooks/usePayments.ts
touch sp-client/src/hooks/useSocial.ts
touch sp-client/src/hooks/useToast.ts
touch sp-client/src/hooks/useMediaQuery.ts

# Файлы для API-клиента
touch sp-client/src/lib/api/api.ts
touch sp-client/src/lib/api/auth.ts
touch sp-client/src/lib/api/users.ts
touch sp-client/src/lib/api/purchases.ts
touch sp-client/src/lib/api/products.ts
touch sp-client/src/lib/api/orders.ts
touch sp-client/src/lib/api/social.ts
touch sp-client/src/lib/api/notifications.ts
touch sp-client/src/lib/api/payments.ts
touch sp-client/src/lib/api/messages.ts

# Файлы для утилит
touch sp-client/src/lib/utils/date.ts
touch sp-client/src/lib/utils/currency.ts
touch sp-client/src/lib/utils/validation.ts
touch sp-client/src/lib/utils/storage.ts
touch sp-client/src/lib/utils/permissions.ts

# Файлы для типов TypeScript
touch sp-client/src/types/user.ts
touch sp-client/src/types/purchase.ts
touch sp-client/src/types/product.ts
touch sp-client/src/types/order.ts
touch sp-client/src/types/notification.ts
touch sp-client/src/types/message.ts
touch sp-client/src/types/payment.ts
touch sp-client/src/types/social.ts

# Файлы для контекстов React
touch sp-client/src/context/AuthContext.tsx
touch sp-client/src/context/ThemeContext.tsx
touch sp-client/src/context/NotificationContext.tsx

# Файлы для стилей
touch sp-client/src/styles/globals.css
touch sp-client/src/styles/variables.css

# Файлы для конфигурации
touch sp-client/src/config/routes.ts
touch sp-client/src/config/constants.ts

# Корневые файлы проекта
touch sp-client/.eslintrc.js
touch sp-client/.prettierrc
touch sp-client/tailwind.config.js

echo "Структура проекта создана в каталоге sp-client."