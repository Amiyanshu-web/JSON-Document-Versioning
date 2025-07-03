const dummyVersions = [
    // User Profile Management - Version 0 (Initial)
    {
        version: 0,
        content: {
            user: {
                id: "user_12345",
                profile: {
                    name: "John Doe",
                    email: "john@example.com",
                    address: {
                        street: "123 Main St",
                        city: "New York",
                        state: "NY",
                        zipcode: "10001",
                        coordinates: {
                            lat: 40.7128,
                            lng: -74.0060
                        }
                    }
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: false,
                        sms: true
                    },
                    theme: "dark",
                    language: "en"
                },
                metadata: {
                    lastLogin: "2024-01-15T08:30:00Z",
                    loginCount: 45,
                    accountType: "premium"
                }
            }
        },
        createdBy: "sarah.johnson"
    },

    // User Profile Management - Version 1 (Name + City Change)
    {
        version: 1,
        content: {
            user: {
                id: "user_12345",
                profile: {
                    name: "Johnny Doe",
                    email: "john@example.com",
                    address: {
                        street: "123 Main St",
                        city: "Boston",
                        state: "MA",
                        zipcode: "02101",
                        coordinates: {
                            lat: 42.3601,
                            lng: -71.0589
                        }
                    }
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: false,
                        sms: true
                    },
                    theme: "dark",
                    language: "en"
                },
                metadata: {
                    lastLogin: "2024-01-16T09:15:00Z",
                    loginCount: 46,
                    accountType: "premium"
                }
            }
        },
        createdBy: "mike.chen"
    },

    // User Profile Management - Version 2 (Add Phone + Change Preferences)
    {
        version: 2,
        content: {
            user: {
                id: "user_12345",
                profile: {
                    name: "Johnny Doe",
                    email: "john@example.com",
                    phone: "+1-555-123-4567",
                    address: {
                        street: "123 Main St",
                        city: "Boston",
                        state: "MA",
                        zipcode: "02101",
                        coordinates: {
                            lat: 42.3601,
                            lng: -71.0589
                        }
                    }
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: true,
                        sms: false
                    },
                    theme: "light",
                    language: "en",
                    autoSave: true
                },
                metadata: {
                    lastLogin: "2024-01-17T10:45:00Z",
                    loginCount: 47,
                    accountType: "premium"
                }
            }
        },
        createdBy: "alex.rodriguez"
    },

    // User Profile Management - Version 3 (Remove Old Field + Deep Nested Change)
    {
        version: 3,
        content: {
            user: {
                id: "user_12345",
                profile: {
                    name: "Johnny Doe",
                    email: "john@example.com",
                    phone: "+1-555-123-4567",
                    address: {
                        street: "456 Oak Avenue",
                        city: "Boston",
                        state: "MA",
                        zipcode: "02101",
                        coordinates: {
                            lat: 42.3601,
                            lng: -71.0589
                        }
                    },
                    avatar: {
                        url: "https://example.com/avatar.jpg",
                        size: "medium"
                    }
                },
                preferences: {
                    notifications: {
                        email: true,
                        push: true,
                        sms: false
                    },
                    theme: "light",
                    language: "es",
                    autoSave: true
                },
                metadata: {
                    lastLogin: "2024-01-18T11:20:00Z",
                    loginCount: 48,
                    accountType: "premium",
                    features: ["advanced_analytics", "priority_support"]
                }
            }
        },
        createdBy: "sarah.johnson"
    },

    // E-commerce Product Catalog - Version 0
    {
        version: 0,
        content: {
            products: [
                {
                    id: "prod_001",
                    name: "Wireless Headphones",
                    price: 199.99,
                    category: "electronics",
                    specs: {
                        battery: "30 hours",
                        connectivity: ["bluetooth", "usb-c"],
                        features: {
                            noiseCancellation: true,
                            waterResistant: false
                        }
                    },
                    inventory: {
                        stock: 50,
                        warehouse: "WH001"
                    }
                }
            ],
            settings: {
                currency: "USD",
                taxRate: 0.08,
                shipping: {
                    free: {
                        threshold: 50,
                        regions: ["US", "CA"]
                    }
                }
            }
        },
        createdBy: "mike.chen"
    },

    // E-commerce Product Catalog - Version 1
    {
        version: 1,
        content: {
            products: [
                {
                    id: "prod_001",
                    name: "Wireless Headphones Pro",
                    price: 249.99,
                    category: "electronics",
                    specs: {
                        battery: "40 hours",
                        connectivity: ["bluetooth", "usb-c", "aux"],
                        features: {
                            noiseCancellation: true,
                            waterResistant: true,
                            voiceAssistant: true
                        }
                    },
                    inventory: {
                        stock: 25,
                        warehouse: "WH001"
                    }
                },
                {
                    id: "prod_002",
                    name: "Smart Watch",
                    price: 399.99,
                    category: "wearables",
                    specs: {
                        battery: "7 days",
                        connectivity: ["bluetooth", "wifi"],
                        features: {
                            heartRate: true,
                            gps: true,
                            waterResistant: true
                        }
                    },
                    inventory: {
                        stock: 15,
                        warehouse: "WH002"
                    }
                }
            ],
            settings: {
                currency: "USD",
                taxRate: 0.085,
                shipping: {
                    free: {
                        threshold: 75,
                        regions: ["US", "CA", "UK"]
                    },
                    express: {
                        available: true,
                        cost: 15.99
                    }
                }
            }
        },
        createdBy: "alex.rodriguez"
    },

    // E-commerce Product Catalog - Version 2
    {
        version: 2,
        content: {
            products: [
                {
                    id: "prod_001",
                    name: "Wireless Headphones Pro",
                    price: 199.99,
                    category: "electronics",
                    specs: {
                        battery: "40 hours",
                        connectivity: ["bluetooth", "usb-c", "aux"],
                        features: {
                            noiseCancellation: true,
                            waterResistant: true,
                            voiceAssistant: true
                        }
                    },
                    inventory: {
                        stock: 30,
                        warehouse: "WH001"
                    }
                },
                {
                    id: "prod_002",
                    name: "Smart Watch",
                    price: 399.99,
                    category: "wearables",
                    specs: {
                        battery: "7 days",
                        connectivity: ["bluetooth", "wifi"],
                        features: {
                            heartRate: true,
                            gps: true,
                            waterResistant: true
                        }
                    },
                    inventory: {
                        stock: 20,
                        warehouse: "WH002"
                    }
                }
            ],
            settings: {
                currency: "USD",
                taxRate: 0.085,
                shipping: {
                    free: {
                        threshold: 75,
                        regions: ["US", "CA", "UK"]
                    },
                    express: {
                        available: true,
                        cost: 15.99
                    }
                },
                discounts: {
                    newCustomer: 0.1,
                    bulk: {
                        threshold: 5,
                        rate: 0.15
                    }
                }
            }
        },
        createdBy: "mike.chen"
    },

    // Company Configuration - Version 0
    {
        version: 0,
        content: {
            company: {
                name: "TechCorp Inc",
                settings: {
                    workingHours: {
                        monday: { start: "09:00", end: "17:00" },
                        tuesday: { start: "09:00", end: "17:00" },
                        wednesday: { start: "09:00", end: "17:00" },
                        thursday: { start: "09:00", end: "17:00" },
                        friday: { start: "09:00", end: "17:00" }
                    },
                    policies: {
                        remote: {
                            allowed: true,
                            maxDays: 3
                        },
                        vacation: {
                            annual: 20,
                            carryOver: 5
                        }
                    }
                }
            }
        },
        createdBy: "alex.rodriguez"
    },

    // Company Configuration - Version 1
    {
        version: 1,
        content: {
            company: {
                name: "TechCorp Inc",
                settings: {
                    workingHours: {
                        monday: { start: "09:00", end: "17:00" },
                        tuesday: { start: "09:00", end: "17:00" },
                        wednesday: { start: "09:00", end: "17:00" },
                        thursday: { start: "09:00", end: "17:00" },
                        friday: { start: "09:00", end: "16:00" }
                    },
                    policies: {
                        remote: {
                            allowed: true,
                            maxDays: 5
                        },
                        vacation: {
                            annual: 25,
                            carryOver: 5
                        },
                        wellness: {
                            mentalHealthDays: 3,
                            gymMembership: true
                        }
                    }
                }
            }
        },
        createdBy: "sarah.johnson"
    },

    // Legacy System Config - Version 0 (Deleted Document)
    {
        version: 0,
        content: {
            legacy: {
                database: {
                    host: "old-db-server",
                    port: 5432,
                    deprecated: true
                }
            }
        },
        createdBy: "david.kim"
    }
  ];

  module.exports = dummyVersions;