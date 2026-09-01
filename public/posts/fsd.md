# FSD (Feature-Sliced Design)

**FSD(Feature-Sliced Design)**는 프론트엔드 프로젝트의 코드를 **기능과 책임에 따라 계층적으로 나누는 아키텍처 설계 방식**입니다.

특히 **React + TypeScript** 프로젝트에서 규모가 커졌을 때 컴포넌트와 로직이 뒤섞이는 문제를 해결하기 위해 많이 사용됩니다.

---

## 1. FSD를 사용하는 이유

프로젝트가 작을 때는 다음과 같이 작성해도 큰 문제가 없습니다.

```text
src/
├── components/
├── pages/
├── hooks/
├── api/
├── utils/
└── store/
```

하지만 프로젝트가 커지면 다음과 같은 문제가 발생합니다.

* 컴포넌트가 너무 많아짐
* 어떤 코드가 어디에 속하는지 알기 어려움
* 여러 기능의 코드가 서로 강하게 결합됨
* 수정할 때 다른 기능에 영향을 줄 가능성이 커짐
* 새로운 개발자가 프로젝트 구조를 이해하기 어려움

FSD는 이를 **기능과 책임을 기준으로 분리**합니다.

---

# 2. FSD 기본 구조

FSD의 대표적인 구조는 다음과 같습니다.

```text
src/
├── app/
├── pages/
├── widgets/
├── features/
├── entities/
└── shared/
```

각 계층마다 담당하는 역할이 다릅니다.

```text
app
 ↓
pages
 ↓
widgets
 ↓
features
 ↓
entities
 ↓
shared
```

**상위 계층은 하위 계층을 사용할 수 있지만, 하위 계층이 상위 계층을 참조하면 안 됩니다.**

---

# 3. 각 Layer의 역할

## 3.1 App

애플리케이션 전체를 설정하는 영역입니다.

```text
app/
├── providers/
├── routes/
├── styles/
└── App.tsx
```

주로 다음과 같은 것들이 들어갑니다.

* 전역 Provider
* Router
* 전역 CSS
* Redux Store
* React Query 설정
* 애플리케이션 초기화

예를 들어:

```tsx
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

---

# 4. Pages

**하나의 페이지를 구성하는 영역**입니다.

예:

```text
pages/
├── HomePage/
├── LoginPage/
├── ProductPage/
└── CartPage/
```

예를 들어 상품 상세 페이지라면:

```text
pages/
└── ProductPage/
    └── ui/
        └── ProductPage.tsx
```

```tsx
function ProductPage() {
  return (
    <>
      <ProductInfo />
      <ProductReviews />
      <RelatedProducts />
    </>
  );
}
```

페이지는 여러 `widgets`, `features`, `entities`를 조합합니다.

---

# 5. Widgets

**여러 기능이나 컴포넌트를 조합한 독립적인 UI 블록**입니다.

예:

```text
widgets/
├── Header/
├── Sidebar/
├── ProductList/
├── CartSummary/
└── UserProfile/
```

예를 들어 쇼핑몰의 Header:

```text
Header
├── Logo
├── SearchBar
├── UserMenu
└── CartButton
```

여러 기능을 하나의 UI 영역으로 묶습니다.

```tsx
function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <UserMenu />
      <CartButton />
    </header>
  );
}
```

---

# 6. Features

FSD에서 가장 중요한 부분 중 하나입니다.

**사용자가 수행하는 특정 기능이나 행동**을 담당합니다.

예:

```text
features/
├── auth/
│   ├── login/
│   └── logout/
├── add-to-cart/
├── like-product/
├── search-product/
└── create-post/
```

예를 들어 상품 좋아요:

```text
features/
└── like-product/
    ├── ui/
    │   └── LikeButton.tsx
    └── model/
        └── useLikeProduct.ts
```

```tsx
function LikeButton({ productId }: Props) {
  const { like } = useLikeProduct();

  return (
    <button onClick={() => like(productId)}>
      ❤️
    </button>
  );
}
```

즉,

> **Features = 사용자가 무엇을 할 수 있는가?**

라고 생각하면 쉽습니다.

---

# 7. Entities

애플리케이션에서 사용하는 **핵심 비즈니스 객체**를 관리합니다.

예:

```text
entities/
├── user/
├── product/
├── order/
└── post/
```

상품이라면:

```text
entities/
└── product/
    ├── model/
    │   └── types.ts
    ├── api/
    │   └── getProduct.ts
    └── ui/
        └── ProductCard.tsx
```

예:

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
```

여기서 중요한 것은 **Product라는 비즈니스 개념 자체를 관리한다는 것**입니다.

---

# 8. Shared

프로젝트 전체에서 공통으로 사용할 수 있는 코드입니다.

```text
shared/
├── ui/
├── api/
├── lib/
├── hooks/
├── config/
└── types/
```

예:

```text
shared/
├── ui/
│   ├── Button/
│   ├── Input/
│   └── Modal/
│
├── hooks/
│   └── useDebounce.ts
│
├── api/
│   └── client.ts
│
└── lib/
    └── formatPrice.ts
```

예를 들어 공통 Button:

```tsx
function Button({ children, onClick }: Props) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```

**특정 기능에 종속되지 않고 여러 곳에서 사용할 수 있는 코드**가 Shared에 들어갑니다.

---

# 9. FSD 전체 구조 예시

쇼핑몰 프로젝트라면 다음과 같이 구성할 수 있습니다.

```text
src/
│
├── app/
│   ├── providers/
│   ├── routes/
│   └── App.tsx
│
├── pages/
│   ├── HomePage/
│   ├── ProductPage/
│   ├── CartPage/
│   └── LoginPage/
│
├── widgets/
│   ├── Header/
│   ├── ProductList/
│   └── CartSummary/
│
├── features/
│   ├── login/
│   ├── logout/
│   ├── add-to-cart/
│   ├── like-product/
│   └── search-product/
│
├── entities/
│   ├── user/
│   ├── product/
│   ├── cart/
│   └── order/
│
└── shared/
    ├── ui/
    ├── hooks/
    ├── api/
    ├── lib/
    └── types/
```

---

# 10. FSD의 핵심 개념

FSD를 이해할 때는 **Layer + Slice + Segment** 세 가지를 이해하면 됩니다.

## Layer

큰 책임을 기준으로 나눕니다.

```text
app
pages
widgets
features
entities
shared
```

## Slice

각 Layer 안에서 **비즈니스 영역**을 기준으로 나눕니다.

예를 들어:

```text
entities/
├── user/
├── product/
├── order/
└── post/
```

여기서 `user`, `product`, `order`가 각각 Slice입니다.

## Segment

Slice 내부에서는 역할에 따라 다시 나눌 수 있습니다.

```text
entities/
└── product/
    ├── ui/
    ├── api/
    ├── model/
    └── lib/
```

이를 **Segment**라고 합니다.

대표적으로:

| Segment  | 역할                |
| -------- | ----------------- |
| `ui`     | UI 컴포넌트           |
| `api`    | API 요청            |
| `model`  | 상태, 타입, 비즈니스 로직   |
| `lib`    | 해당 영역에서 사용하는 유틸리티 |
| `config` | 설정값               |

---

# 11. 의존성 방향

FSD에서 매우 중요한 부분입니다.

```text
App
 ↓
Pages
 ↓
Widgets
 ↓
Features
 ↓
Entities
 ↓
Shared
```

예를 들어:

```tsx
// pages/ProductPage

import { ProductCard } from "@/entities/product";
import { AddToCartButton } from "@/features/add-to-cart";
```

가능합니다.

하지만:

```tsx
// shared/ui/Button

import { Product } from "@/entities/product";
```

이런 식으로 Shared가 Entity를 참조하면 구조가 깨집니다.

즉,

```text
상위 Layer → 하위 Layer
```

방향으로 의존하는 것이 기본입니다.

---

# 12. FSD를 한 문장으로 이해하기

쉽게 정리하면 다음과 같습니다.

| Layer      | 질문                        |
| ---------- | ------------------------- |
| `app`      | 앱 전체를 어떻게 실행할까?           |
| `pages`    | 어떤 페이지인가?                 |
| `widgets`  | 화면의 어떤 큰 영역인가?            |
| `features` | 사용자가 어떤 행동을 하는가?          |
| `entities` | 어떤 비즈니스 객체인가?             |
| `shared`   | 여러 곳에서 공통으로 사용하는 것은 무엇인가? |

예를 들어 **쇼핑몰에서 상품을 장바구니에 넣는다**고 하면:

```text
Product
  ↓
entities/product

장바구니에 추가
  ↓
features/add-to-cart

상품 목록
  ↓
widgets/product-list

상품 상세 페이지
  ↓
pages/product-page
```

이렇게 책임을 나누는 것이 FSD입니다.

---

# 13. React 프로젝트에서 추천 구조

React + TypeScript + React Query 기준으로는 다음처럼 시작하면 이해하기 쉽습니다.

```text
src/
├── app/
│   ├── providers/
│   ├── routes/
│   └── App.tsx
│
├── pages/
│   ├── HomePage/
│   ├── LoginPage/
│   └── ProductPage/
│
├── widgets/
│   ├── Header/
│   └── ProductList/
│
├── features/
│   ├── auth/
│   ├── search-product/
│   └── add-to-cart/
│
├── entities/
│   ├── user/
│   ├── product/
│   └── cart/
│
└── shared/
    ├── ui/
    ├── api/
    ├── hooks/
    └── lib/
```

---

# 14. 핵심 정리

FSD는 단순히 **폴더를 여러 개로 나누는 방법**이 아닙니다.

핵심은 **코드의 책임과 의존성을 명확하게 관리하는 것**입니다.

```text
App
 │
 ├── Pages       → 페이지
 │
 ├── Widgets     → 큰 UI 영역
 │
 ├── Features    → 사용자 행동/기능
 │
 ├── Entities    → 비즈니스 객체
 │
 └── Shared      → 공통 코드
```

쉽게 기억하면:

> **Pages = 화면**
>
> **Widgets = 화면의 큰 구성요소**
>
> **Features = 사용자의 행동**
>
> **Entities = 데이터/비즈니스 객체**
>
> **Shared = 공통으로 사용하는 것**
>
> **App = 애플리케이션 전체 설정**

따라서 FSD의 가장 중요한 목적은

**"프로젝트가 커져도 코드 간의 책임과 의존성을 명확하게 유지하는 것"**

이라고 이해하면 됩니다.
