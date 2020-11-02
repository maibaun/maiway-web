import { storage } from 'firebase';
import React from 'react';
import Firebase from 'firebase';
import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
  } from "@material-ui/core";

class Upimage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
     
    }
    handleQuery(){
      const db = Firebase.firestore();
      const data = {
        "address": "Gyeonggi, Seoul",
        "tour_package_groups": [
          {
            "_firestore": {
              "_settings": {
                "credentials": {
                  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                  "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
                },
                "projectId": "maiway-stg",
                "firebaseVersion": "9.2.0",
                "libName": "gccl",
                "libVersion": "4.4.0 fire/9.2.0",
                "servicePath": "firestore.googleapis.com",
                "port": 443,
                "clientConfig": {},
                "scopes": [
                  "https://www.googleapis.com/auth/cloud-platform",
                  "https://www.googleapis.com/auth/datastore"
                ]
              },
              "_settingsFrozen": true,
              "_serializer": {
                "allowUndefined": false
              },
              "_projectId": "maiway-stg",
              "registeredListenersCount": 0,
              "bulkWritersCount": 0,
              "_backoffSettings": {
                "initialDelayMs": 100,
                "maxDelayMs": 60000,
                "backoffFactor": 1.3
              },
              "_clientPool": {
                "concurrentOperationLimit": 100,
                "maxIdleClients": 1,
                "activeClients": {},
                "terminated": false,
                "terminateDeferred": {
                  "promise": {}
                }
              }
            },
            "_path": {
              "segments": [
                "tour_package_groups",
                "tFmGT6PVlNuG5T5dKzLv"
              ]
            },
            "_converter": {}
          },
          {
            "_firestore": {
              "_settings": {
                "credentials": {
                  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                  "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
                },
                "projectId": "maiway-stg",
                "firebaseVersion": "9.2.0",
                "libName": "gccl",
                "libVersion": "4.4.0 fire/9.2.0",
                "servicePath": "firestore.googleapis.com",
                "port": 443,
                "clientConfig": {},
                "scopes": [
                  "https://www.googleapis.com/auth/cloud-platform",
                  "https://www.googleapis.com/auth/datastore"
                ]
              },
              "_settingsFrozen": true,
              "_serializer": {
                "allowUndefined": false
              },
              "_projectId": "maiway-stg",
              "registeredListenersCount": 0,
              "bulkWritersCount": 0,
              "_backoffSettings": {
                "initialDelayMs": 100,
                "maxDelayMs": 60000,
                "backoffFactor": 1.3
              },
              "_clientPool": {
                "concurrentOperationLimit": 100,
                "maxIdleClients": 1,
                "activeClients": {},
                "terminated": false,
                "terminateDeferred": {
                  "promise": {}
                }
              }
            },
            "_path": {
              "segments": [
                "tour_package_groups",
                "s7qAvtDDVeq3VMvA8BRp"
              ]
            },
            "_converter": {}
          },
          {
            "_firestore": {
              "_settings": {
                "credentials": {
                  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                  "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
                },
                "projectId": "maiway-stg",
                "firebaseVersion": "9.2.0",
                "libName": "gccl",
                "libVersion": "4.4.0 fire/9.2.0",
                "servicePath": "firestore.googleapis.com",
                "port": 443,
                "clientConfig": {},
                "scopes": [
                  "https://www.googleapis.com/auth/cloud-platform",
                  "https://www.googleapis.com/auth/datastore"
                ]
              },
              "_settingsFrozen": true,
              "_serializer": {
                "allowUndefined": false
              },
              "_projectId": "maiway-stg",
              "registeredListenersCount": 0,
              "bulkWritersCount": 0,
              "_backoffSettings": {
                "initialDelayMs": 100,
                "maxDelayMs": 60000,
                "backoffFactor": 1.3
              },
              "_clientPool": {
                "concurrentOperationLimit": 100,
                "maxIdleClients": 1,
                "activeClients": {},
                "terminated": false,
                "terminateDeferred": {
                  "promise": {}
                }
              }
            },
            "_path": {
              "segments": [
                "tour_package_groups",
                "QituwVnOzumLitQdxI7D"
              ]
            },
            "_converter": {}
          },
          {
            "_firestore": {
              "_settings": {
                "credentials": {
                  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                  "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
                },
                "projectId": "maiway-stg",
                "firebaseVersion": "9.2.0",
                "libName": "gccl",
                "libVersion": "4.4.0 fire/9.2.0",
                "servicePath": "firestore.googleapis.com",
                "port": 443,
                "clientConfig": {},
                "scopes": [
                  "https://www.googleapis.com/auth/cloud-platform",
                  "https://www.googleapis.com/auth/datastore"
                ]
              },
              "_settingsFrozen": true,
              "_serializer": {
                "allowUndefined": false
              },
              "_projectId": "maiway-stg",
              "registeredListenersCount": 0,
              "bulkWritersCount": 0,
              "_backoffSettings": {
                "initialDelayMs": 100,
                "maxDelayMs": 60000,
                "backoffFactor": 1.3
              },
              "_clientPool": {
                "concurrentOperationLimit": 100,
                "maxIdleClients": 1,
                "activeClients": {},
                "terminated": false,
                "terminateDeferred": {
                  "promise": {}
                }
              }
            },
            "_path": {
              "segments": [
                "tour_package_groups",
                "9hNvnHgRIu11CuQwuUZt"
              ]
            },
            "_converter": {}
          }
        ],
        "jp_name": "スキーパッケージツアー（4D3N）",
        "exclusion": "•Personal Expenses",
        "cn_descr": "简介首尔是韩国排名第一的城市，也是亚洲最受欢迎的目的地之一！ 这是一个永不眠的城市。来到首尔，体验这座城市充沛的精力和激情。 世界上每个城市都有自己独特的氛围。 不断变化的首尔是世界上最繁忙的城市之一。 我们精心设计了主题旅游，让您可以体验这座繁华热闹的城市的活力。你准备好了吗？我们走吧！",
        "company_reference": {
          "_firestore": {
            "_settings": {
              "credentials": {
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
              },
              "projectId": "maiway-stg",
              "firebaseVersion": "9.2.0",
              "libName": "gccl",
              "libVersion": "4.4.0 fire/9.2.0",
              "servicePath": "firestore.googleapis.com",
              "port": 443,
              "clientConfig": {},
              "scopes": [
                "https://www.googleapis.com/auth/cloud-platform",
                "https://www.googleapis.com/auth/datastore"
              ]
            },
            "_settingsFrozen": true,
            "_serializer": {
              "allowUndefined": false
            },
            "_projectId": "maiway-stg",
            "registeredListenersCount": 0,
            "bulkWritersCount": 0,
            "_backoffSettings": {
              "initialDelayMs": 100,
              "maxDelayMs": 60000,
              "backoffFactor": 1.3
            },
            "_clientPool": {
              "concurrentOperationLimit": 100,
              "maxIdleClients": 1,
              "activeClients": {},
              "terminated": false,
              "terminateDeferred": {
                "promise": {}
              }
            }
          },
          "_path": {
            "segments": [
              "company_info",
              "ZIVxvph9km1F9W9sd6YI"
            ]
          },
          "_converter": {}
        },
        "ph_name": "Ski Package Tour (4D3N)",
        "inclusions": "•Transport (Van /25-seater bus/45-seater bus)/n•Accommodations (3-star hotel)/n•All admission fee/n•Meals/n•Rental of ski gear, Ski Outfit,sunkid(moving walk)pass",
        "is_featured": false,
        "g": 22655.5707732,
        "owner_reference": {
          "_firestore": {
            "_settings": {
              "credentials": {
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDDZcCXwiG5/aUA\nNSgiuo/vHclBJ7Sd/PLw/bdMaYQya8My1Knd5/cG2rwZiQYh1bcpYzLRE/Zz7D6N\n03yMEkk/kC/rgiDUQZuW3EiOdrL+YD0ZjKgnyIUiNyFiELiOnHy8GvLhE2Q3ZnXy\ndf42YJhbz8Bk43YAg+vRj/TyRQezgTkbAl2j0mtmPIdE970tlqoRXpJYuh+eAax4\nkRrMQUUbp8BpgplaUq+C2/RvnSUnefQyD5KKY8owwHvDE2fAmxz+UVBbkMFYwsX7\nOWFdF8nrBTQXK3iDHf8/NARtDgDH+RsjjvFZHww02XlCX20xKDNF8H3YZxKPFaV9\nWfw4Jsv1AgMBAAECggEALGUgyEo/I/VFiUHKm/Nj8woDOTbGgpPfddJLlISv2M3j\ntJedfbHvziKiFLItjr/yROjJObhNqWJ+hvZLaL7Z3iOKQ7nV8Cv06CamJJpDCmk+\n0KCE7z8Pwqmgf9m5OQvEim+cCfgAL9crirp01xGE5G1UMwf8Pls61+sblfUJriaS\nulb3bL84gx94QYvrtTzsRlSxFEa7kADGvuvH6GyZKmMGpe42YhHiRMIKDBmnnr+a\nV/M6+GA9O9jnDLTw98OTHxrWUu24NAs4MDeMvCR+cdEyZDjSOak9LcSGde8XEJVV\nHDqSh3hiMsJr/QJiYS5KpIaqQ/kRFZfKonLfRd3l4QKBgQD3EPSVPz/La3gWPCBm\ndutjciubzOIETqy6nLIzOH/jdOH0BpHBurW2ryE2p/kjqPsp7bLFchNaJm/Sj1LD\nIZlHsHF0viBBZn2ID/CqmKuGLKl7HtHeqbCV+xm/OppeZ7SDUq5s8wyE/lGPfVJh\nlkLi0N61TxhCJ1t7G1nLnh0lYQKBgQDKdoJVokLWv7LcK0dnRGSQJTXnjy2uPKRf\numnqyv2IMnvexkowvXNM3IJvYT0oIax0u9B+r9uau2LvGtULDxEeiWQiMa5AuaTm\nqOvd7JFSS8OKN3SfxtfL7MHS9mXG9WfbEUXEieuO/pN0Ias+X46uI0nKlqbv9Y3h\n6Zfe7MGbFQKBgHDdww4HRep03vgxYY/NlbzpZDiZgUr8cfYSLWouzmWneK2U7rM0\ny1x4ZtDkLXF3+b1uxDNk6KhPVNg491MDH1Xbqgjt7ihSXNhyh7w3YGw8LPR84N06\nYdwySNHOQMUN1S4E8H//DGIZGENXufGwxj99sa/cQTW/axAzL3NQePohAoGAH83k\nBX260C9G8o0d51v4DCi8Qgbc3y0JiTwoXUjL8PQ1PzaY+vUXwrA1ETgOOlqn06KZ\nSv1nGvRqwzLM2rLgNpLQlwqE3AgNnmpUuwTpgysBqZmyiVLcHV2wyOoJ7OoqCWC6\nO/iKd2kIUsrjMqYiLLrAYcGusa06P43JXKyGcU0CgYEAyCFb/kj+bpNuQ7OmnFbR\nGWtT+scib/NCYVCb/TCDzoSdhzxMO3wYqjfOfjsUmT0KlhEEy/+r7NGcHAhRd33o\nE5qXr8LkFwX7EHtwy+n4y+LHb6x4/z1+gnA4NuQBIz2qYMf5tLEyTpyis1x19jA8\njv4DYL+RDxCEtSsgaFpfzck=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-yf6td@maiway-stg.iam.gserviceaccount.com"
              },
              "projectId": "maiway-stg",
              "firebaseVersion": "9.2.0",
              "libName": "gccl",
              "libVersion": "4.4.0 fire/9.2.0",
              "servicePath": "firestore.googleapis.com",
              "port": 443,
              "clientConfig": {},
              "scopes": [
                "https://www.googleapis.com/auth/cloud-platform",
                "https://www.googleapis.com/auth/datastore"
              ]
            },
            "_settingsFrozen": true,
            "_serializer": {
              "allowUndefined": false
            },
            "_projectId": "maiway-stg",
            "registeredListenersCount": 0,
            "bulkWritersCount": 0,
            "_backoffSettings": {
              "initialDelayMs": 100,
              "maxDelayMs": 60000,
              "backoffFactor": 1.3
            },
            "_clientPool": {
              "concurrentOperationLimit": 100,
              "maxIdleClients": 1,
              "activeClients": {},
              "terminated": false,
              "terminateDeferred": {
                "promise": {}
              }
            }
          },
          "_path": {
            "segments": [
              "users",
              "LRDXwUnDDDBDfBpWST7e"
            ]
          },
          "_converter": {}
        },
        "currency": "Krw",
        "geo": {
          "_latitude": 35.1595454,
          "_longitude": 126.8526012
        }
      }
      

        
      
      
      
      
      console.log("dddddddddd",data)
      const js = JSON.stringify(data)
      console.log("asdasdasdasd",js)
      const jsp = JSON.parse(js)
      console.log("fffff", jsp)
      db.collection("tour_packages").doc().set(jsp)

      // db.collection("tour_packages")
      //   .orderBy("address","desc")
      //   .limit(20)
      //   .onSnapshot(function(snapshot) {
      //       snapshot.forEach(function(doc) {
      //           // const js = doc.data()
      //           console.log(">>>", JSON.stringify(doc.data()))     
      //           // const jss = JSON.stringify(js)
      //           // console.log(js)
        
      //           // db.collection("places").doc().set(doc.data())
      //       });
      //   });  
      
    }

    _handleSubmit(e){
        e.preventDefault();
      

        const db = Firebase.firestore();
        const storageRef = Firebase.storage().ref();
        const myRef = Firebase.database().ref();        
        const files = this.state.file;
        // const documentId = docRef;

        db.collection("places")
        .orderBy("created_at", "desc")
        .limit(1)
        .onSnapshot(function(snapshot) {
            snapshot.forEach(function(doc) {
              console.log("11111",doc.id);
              const dat = doc.id;
        db.collection("places").doc(dat).get().then((docRef) => { console.log(docRef.id, "/////////",docRef.data()) })
        .catch((error) => { })
        console.log("`````````````````",files)
        const uploadTask = storageRef.child(`places/${dat}/${dat}`).put(files);
        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case Firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case Firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
           
          }, function(error) {
          }, function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
        
            });
          });
          alert("Image Successfully Uplaoded!");
        });
        });
    }


    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }
  
      return (
        

        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
              <Button variant="contained"  onClick={(e)=>this._handleSubmit(e)} color="primary" >
              Upload Image
            </Button>
            {/* <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button> */}
           
          </form>
          <input type='submit'
          value="Get"
          onClick={this.handleQuery} />

          {/* <div className="imgPreview" >

            {$imagePreview}
          </div> */}
        </div>
      )
    }
  }
    
//   ReactDOM.render(<Upimage/>, document.getElementById("mainApp"));
export default Upimage;